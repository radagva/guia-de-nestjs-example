import { Injectable } from "@nestjs/common";

// - VALUE PROVIDER
export const VALUE_CONFIG = {
  DSN: "none",
  VERSION: 1,
};

export type ValueConfig = typeof VALUE_CONFIG;
export const VALUE_PROVIDER = Symbol("VALUE_PROVIDER");

// - FACTORY PROVIDER
export const FACTORY_CONFIG = {
  DSN: "none",
  VERSION: 1,
  factory: true,
};

export type FactoryConfig = typeof FACTORY_CONFIG;
export const FACTORY_PROVIDER = Symbol("FACTORY_PROVIDER");

// - EXISTING PROVIDER

export const READABLE_PROVIDER = Symbol("READABLE_PROVIDER");
export const WRITABLE_PROVIDER = Symbol("WRITABLE_PROVIDER");

export interface Readable {
  read(): string;
}

export interface Writeable {
  write(): void;
}

@Injectable()
export class StorageManager implements Readable, Writeable {
  read(): string {
    return "I'm reading";
  }

  write(): void {
    console.log("I'm writing");
  }
}
