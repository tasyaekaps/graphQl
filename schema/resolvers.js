const { UserList, MovieList } = require("../FakeData")
const _ = require("lodash")
const resolvers = {
    // contain all the resolvers funstion which gonna do call to databases, or send data to fe
    Query: { //highest object level
        // all resolvers function for subfield for the types
        users: () => {
            //tell the graphql what to return 
            return UserList;
        },

        user: (parent, args) => {
            const id = args.id //catch the params
            const user  = _.find(UserList, {id : Number(id)}) //an operation using lodash
            return user
        },

        // MOVIE RESOLVERS 

        movies: () => {
            return MovieList;
        },

        movie: (parents, args) => {
            const name = args.name //catch the params
            const movie  = _.find(MovieList, {name}) //an operation using lodash
            return movie
        }
    }
}

module.exports = { resolvers }