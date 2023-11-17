import "../public/main.css";
import { faker } from "@faker-js/faker";
/*                            DOM VARIABLES                                */

// LOGIC VARIABLES
let carParkingTime: number = 10; //minutes
class Car {
  public id: string;
  public enterTime: number = 0;
  public exitTime: number = 0;
  constructor(public name: string, public color: string) {}
  setId(id: string) {
    this.id = id;
  }
  gerId() {
    return this.id;
  }
}
class ElectroCar extends Car {
  constructor(name: string, color: string, public charger: number) {
    super(name, color);
  }
}

class PetrolCar extends Car {
  constructor(name: string, color: string, public petrol: number) {
    super(name, color);
  }
}
class HybridCar extends Car {
  constructor(name: string, color: string, public gas: number) {
    super(name, color);
  }
}
class BYD extends ElectroCar {}
const electroCar1BYD = new BYD("byd", "black", 50);
console.log(electroCar1BYD);

class Malibu extends PetrolCar {}
const petrolCar2Malibu = new Malibu("malibu", "white", 80);
console.log(petrolCar2Malibu);

class Zeekr extends HybridCar {}
const hydriCar3Zeekr = new Zeekr("zeekr", "grey", 30);

console.log(hydriCar3Zeekr);

interface Pricing {
  electroCarPricePerMinute: number;
  petrolCarPricePerMinute: number;
  HybridCarPricePerMinute: number;
}
let pricing: Pricing = {
  electroCarPricePerMinute: 10,
  petrolCarPricePerMinute: 20,
  HybridCarPricePerMinute: 30,
};
interface Capacity {
  electroCar: number;
  petrolCar: number;
  HybridCar: number;
}
let capacity: Capacity = {
  electroCar: 50,
  petrolCar: 80,
  HybridCar: 70,
};
class Parking<T extends Car> {
  private cars: T[] = [];
  private givenMoney: number[] = [];
  constructor(
    public name: string,
    public capacity: Capacity,
    public pricing: Pricing
  ) {}
  enterCar(car: T) {
    const enteredcar = this.cars.some((caar) => caar.name === car.name);
    if (enteredcar) {
      console.error("This car already exists");
    } else {
      car.setId(faker.string.uuid());
      car.enterTime = new Date().getMinutes();
      car.exitTime = car.enterTime + carParkingTime; //  car.eexitTimex = new Date().getMinutes();
      console.log(`the entrance of this car ${new Date().getMinutes()}`);
      this.cars.push(car);
    }
  }

  private logoutCar(caR: T) {
    this.cars = this.cars.filter((car) => car.id !== caR.id);
    console.log(`${caR.name} exists`);
  }
  calculateTotalPricePerCar(carID: string) {
    let price: number = 0;
    const car = this.cars.find((car) => car.id === carID) as T;

    if (!car) {
      console.error(`This car does not exist (id ${carID}) `);
    }
    let time = car.exitTime - car.enterTime;
    if (time < 0) {
      time = 60 - car.exitTime + car.enterTime;
    }
    if (car instanceof ElectroCar) {
      price = time * pricing.electroCarPricePerMinute;
    } else if (car instanceof PetrolCar) {
      price = time * pricing.petrolCarPricePerMinute;
    } else if (car instanceof HybridCar) {
      price = time * pricing.HybridCarPricePerMinute;
    }
    this.givenMoney.push(price);
    console.log(`${car.name} payed ${price}$`);
    this.logoutCar(car);
  }
  calculateTotalProfit() {
    let income: number = 0;
    for (const money of this.givenMoney) {
      income += money;
    }
    console.log(income);

    return income;
  }
  getCars() {
    if (this.cars.length === 0) {
      console.log(`${parking.name} is empty`);
    }
    return this.cars;
  }
}

const parking = new Parking("riviera", capacity, pricing);

parking.enterCar(electroCar1BYD);
parking.enterCar(petrolCar2Malibu);
parking.enterCar(hydriCar3Zeekr);
console.log(parking.getCars());
parking.calculateTotalPricePerCar(petrolCar2Malibu.id);
parking.calculateTotalPricePerCar(electroCar1BYD.id);
console.log(parking.getCars());
parking.calculateTotalProfit();

// props:   (public)name, (public)capacity, (public)pricing
// methods:  Methods enterCar(car: T), logoutCar(), calculateTotalPricePerCar(carID: string), calculateTotalProfit()

/*
 *
 * Example :
 * const parking = new Parking("Sebzor", capacity, pricing)
 * const car1 = new BYD("BYD Sons")
 * parking.enterCar(car1) // { minutes: 5 }
 * parking.logout(car1) // { totalPrice: 50 }
 *
 *
 * const capacity: Capacity = {
 *  electroCar: 4,
 *  petrolCar: 12,
 *  HybridCar: 3,
 * }
 *
 * pricing = {
 *  electroCarPricePerMinute: 10,
 *  petrolCarPricePerMinute: 4,
 *  HybridCarPricePerMinute: 20,
 * }
 *
 *
 * Rules:
 *  ✅ Internetdan foydalansa boladi
 *  ✅ Repo yaratish kerak
 *  ✅ UI shart emas
 *  ✅ Loyiha TS da bolishi kerak
 *
 */
