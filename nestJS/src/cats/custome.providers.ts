import { Injectable } from '@nestjs/common';

// Define a custom service class
@Injectable()
export class CustomService {
  getData(): string {
    return 'This is custom data from CustomService';
  }
}

// Define a custom value
const customValue = 'This is a custom value';

// Export the custom service and value
export const customProviders = [
  CustomService, // Provide the CustomService class
  {
    provide: 'CustomValue', // Provide a string token for the custom value
    useValue: customValue, // Use the custom value
  },
];
