require("dotenv").config();

const resolvers = {
  Query: {
    home: () => "Data Layer",
  },
  Mutation: {
    auth: async (_, { email }) => {
      try {
        const res = await fetch(process.env.AUTH_SERVICE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        });
        const authData = await res.json();
        if (authData.error) {
          throw new Error(authData.error);
        } else {
          return authData;
        }
      } catch (error) {
        throw error;
      }
    },

    user: async (_, { tokenId, email }) => {
      let result = {
        email,
        memberNo: null,
        name: null,
        post: {
          memberNo: null,
          amount: null,
        },
      };

      try {
        const res = await fetch(process.env.USER_SERVICE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tokenId,
            email,
          }),
        });

        const userData = await res.json();

        result = {
          ...result,
          name: userData.name,
          memberNo: userData.memberNo,
        };

        if (userData?.memberNo) {
          try {
            const res = await fetch(process.env.POST_SERVICE_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                memberNo: userData.memberNo,
              }),
            });
            const paymentData = await res.json();

            result = { ...result, post: paymentData };
          } catch (error) {
            throw error;
          }
        } else {
          throw new Error(userData?.error);
        }

        return result;
      } catch (error) {
        throw error;
      }
    },

    // post: async (_, { memberNo }) => {
    //   try {
    //     const res = await fetch(process.env.POST_SERVICE_URL, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         memberNo,
    //       }),
    //     });
    //     const paymentData = await res.json();
    //     return paymentData;
    //   } catch (error) {
    //     throw new Error("Failed, something wrong in Post Service");
    //   }
    // },
  },
};

module.exports = resolvers;
