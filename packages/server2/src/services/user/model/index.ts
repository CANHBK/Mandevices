import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
	@Field()
	name: string;
	@Field()
	firstName: string;
	@Field()
	lastName: string;
}
