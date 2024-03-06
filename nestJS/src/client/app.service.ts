import { Injectable, OnModuleInit } from "@nestjs/common";
import { Helloservice } from "./hello.service";

@Injectable()
export class Appservice implements OnModuleInit {
    onModuleInit() {
        console.log("App service is initialized");
    }
    constructor (private helloservice:Helloservice){}

    getroot(){
        this.helloservice.sayhello("Hello my name is dhruvil");
        return 'hello world';
    }
}
