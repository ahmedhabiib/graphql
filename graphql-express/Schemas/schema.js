const userData = require('../MOCK_DATA.json');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const UserType = require('./TypeDefs/UserType');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		getAllUsers: {
			type: new GraphQLList(UserType),
			args: { id: { type: GraphQLInt }, firstName: { type: GraphQLString } },
			resolve(parent, args) {
				return userData;
			}
		},
		getUser: {
			type: UserType,
			args: {
				id: {
					type: GraphQLInt
				},
				firstName: {
					type: GraphQLString
				},
				lastName: {
					type: GraphQLString
				}
			},
			resolve(parent, args) {
				return userData.find((user) => user.id === args.id);
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parents, args) {
				console.log(args);
				userData.push({
					id: userData.length + 1,
					firstName: args.firstName,
					lastName: args.lastName,
					email: args.email,
					password: args.password
				});
				return args;
			}
		}
	}
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

module.exports = schema;
