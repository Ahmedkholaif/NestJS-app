import { Injectable } from '@nestjs/common';
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
    return this.coffees.find(coffee => coffee.id === +id);
  } 

  create(coffee: Coffee): Coffee {
    this.coffees.push(coffee);
    return coffee;
  }

  update(id: string, coffee: Coffee): Coffee {
    const index = this.coffees.findIndex(c => c.id === +id);
    this.coffees[index] = coffee;
    return coffee;
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
