import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  
  async findAll() {
    return this.coffeeRepository.findAndCount({
      relations: ['flavors'],
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

}
