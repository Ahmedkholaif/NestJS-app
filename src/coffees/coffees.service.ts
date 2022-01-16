import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection
  ) {}
  
  async findAll(paginationQuery: PaginationQueryDto) {
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne(id);
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {

    const flavors =createCoffeeDto.flavors && await Promise.all(createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)));
    const coffee = this.coffeeRepository.create({...createCoffeeDto, flavors});
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors && await Promise.all(updateCoffeeDto.flavors.map(
      //arroe function to read this
      name => this.preloadFlavorByName(name)));

    const coffee = await this.coffeeRepository.preload({
      id:+id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return  this.coffeeRepository.save(coffee);

  }

  async delete(id: string) {
    const coffee = await this.coffeeRepository.findOne(id);
    if (coffee) {

    this.coffeeRepository.remove(coffee);
  }}

  findByFilter(filter: any) {
    return this.coffeeRepository.find(filter);
  }

  private async preloadFlavorByName(name:string){

    const falvor = await this.flavorRepository.findOne({name});
    if(falvor){
      return falvor;
    }
    return this.flavorRepository.create({name});
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction(); 
    try {
      coffee.recommendations++;
      
      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };
    
      await queryRunner.manager.save(coffee); 
      await queryRunner.manager.save(recommendEvent);
      
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
