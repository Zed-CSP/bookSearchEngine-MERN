// export const GET_ME = gql`
//   query me($username: String!) {
//     me(username: $username) {
//       _id
//       username
//       email
//       bookCount
//       savedBooks {
//         bookId
//         authors
//         title
//         description
//         image
//         link
//       }
//     }
//   }
// `;

// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!) {
//     addUser(username: $username, email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//         email
//         bookCount
//         savedBooks {
//           bookId
//           authors
//           title
//           description
//           image
//           link
//         }
//       }
//     }
//   }
// `;

// export const SAVE_BOOK = gql`
//   mutation saveBook(
//     $authors: [String]!, 
//     $description: String!, 
//     $title: String!, 
//     $bookId: String!, 
//     $image: String, 
//     $link: String
//     ) {
//       _id
//       username
//       email
//       bookCount
//       savedBooks {
//         bookId
//         authors
//         title
//         description
//         image
//         link
//       }
//     }
// `;

// export const REMOVE_BOOK = gql`
//   mutation removeBook($bookId: String!) {
//     _id
//     username
//     email
//     bookCount
//     savedBooks {
//       bookId
//       authors
//       title
//       description
//       image
//       link
//     }
//   }
// `;

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
