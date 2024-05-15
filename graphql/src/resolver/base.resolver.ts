import { Resolver, Query } from '@nestjs/graphql';
interface ClassType<T = any> {
  new (...args: any[]): T;
}
export function BaseResolver<EntityType>(EntityClass: ClassType): any {
  @Resolver(() => EntityClass, { isAbstract: true })
  abstract class BaseResolverHost {
    constructor(private readonly service: any) {}

    @Query(() => [EntityClass], { name: `findAll${EntityClass.name}` })
    async findAll(): Promise<EntityType[]> {
      return this.service.findAll();
    }
  }

  return BaseResolverHost;
}
