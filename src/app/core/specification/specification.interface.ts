
/**
 * For creating specification class use this interface
 */
export interface AppSpecification<T> {
  isSatisfiedBy(item: T): boolean;
}

export class AppAndSpecification<T> implements AppSpecification<T> {
  constructor(private spec1: AppSpecification<T>, private spec2: AppSpecification<T>) { }

  isSatisfiedBy(item: T): boolean {
    return this.spec1.isSatisfiedBy(item) && this.spec2.isSatisfiedBy(item);
  }
}

export class OrSpecification<T> implements AppSpecification<T> {
  constructor(private spec1: AppSpecification<T>, private spec2: AppSpecification<T>) { }

  isSatisfiedBy(item: T): boolean {
    return this.spec1.isSatisfiedBy(item) || this.spec2.isSatisfiedBy(item);
  }
}


