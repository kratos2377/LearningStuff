class Passenger {

    protected name: Passenger;
    protected phone: string;
    protected age: number;
    protected id: string;

    constructor(name: Passenger , phone: string , age: number) {
        this.name = name;
        this.phone = phone;
        this.age = age;
        this.id = name + "_" + phone + "_" + age;
    }


    getName = () => {
        return this.name
    }

}


export default Passenger;