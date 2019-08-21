export class PhoneNumber {
    country: string;
    // area: string;
    // prefix: string;
    // line: string;
  
    // format phone numbers as E.164
    get e164() {
      const num = this.country 
      return `+${num}`
    }
  
  }