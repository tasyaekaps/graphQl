const { UserList, MovieList } = require("../FakeData")
const _ = require("lodash")
const resolvers = {
    // contain all the resolvers function which gonna do call to databases, or send data to fe
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
    },
    //despite for queries type you could give a function to resolve a subfield in another types
    User:{
        favoriteMovie: () => {
            return _.filter( MovieList, (movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010 )
        }
    },

    //resolver function to handle mutation tyoe
    Mutation:{
        createUser: (parents, args) => {
            const user = args.input; //because in the subfield createuser we defined input
            const lastId = userList[userList.length];
            user.id = lastId + 1;
            userList.push(user);
            return user;
        },

        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            let userUpdated;
            UserList.forEach((user) => {
              if (user.id === Number(id)) {
                user.username = newUsername;
                userUpdated = user;
              }
            });
      
            return userUpdated;
          },
      
          deleteUser: (parent, args) => {
            const id = args.id;
            _.remove(UserList, (user) => user.id === Number(id));
            return null;
          },
        },
    }


module.exports = { resolvers }