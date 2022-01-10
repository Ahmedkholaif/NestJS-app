import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] =[
    {
      id: 1,
      name: 'Cappuccino',
      brand: 'Froilà',
      price: 5,
      flavors: ['vanilla1', 'caramel1'],
    },
    {
      id: 2,
      name: 'Latte',
      brand: 'Froilà2',
      price: 2.5,
      flavors: ['vanilla2', 'caramel2'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find(coffee => coffee.id === +id);
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  } 

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const coffee = this.coffees.find(c => c.id === +id);
    if(coffee){
      // update coffe
    }
    return updateCoffeeDto;
  }

  delete(id: string): void {
    const index = this.coffees.findIndex(c => c.id === +id);
    if (index >= 0){
      this.coffees.splice(index, 1);

    }
  }

  findByFlavor(flavor: string): Coffee[] {
    return this.coffees.filter(coffee => coffee.flavors.includes(flavor));
  }

  findByPrice(price: number): Coffee[] {
    return this.coffees.filter(coffee => coffee.price <= price);
  }

  findByBrand(brand: string): Coffee[] {
    return this.coffees.filter(coffee => coffee.brand === brand);
  }

  findByName(name: string): Coffee[] {
    return this.coffees.filter(coffee => coffee.name === name);
  }

  findByNameAndBrand(name: string, brand: string): Coffee[] {
    return this.coffees.filter(coffee => coffee.name === name && coffee.brand === brand);
  }

}
