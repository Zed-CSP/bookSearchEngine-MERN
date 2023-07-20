const {user} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('books');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return {token, user};
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return{token, user};
        },

        saveBook: async (parent, {bookData}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(   
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: bookData}},
                    {new: true, runValidators: true}
                );
            }
        throw new AuthenticationError('You need to be logged in to save this book!');
        },

        removeBook: async (parent, {bookId}, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                );
            }
            throw new AuthenticationError('You need to be logged in to remove this book!');
        }
    }
};


module.exports = resolvers;