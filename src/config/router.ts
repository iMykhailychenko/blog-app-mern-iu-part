export default {
    home: '/',
    trial: '/trial',

    post: {
        single: (id: string): string => `/post/${id}`,
        singleStat: '/post/:id',
        tag: (tag: string): string => `/tags/${tag}`,
        tagStat: '/tags/:tag',
        new: '/new_post',
    },

    auth: {
        signup: '/signup',
        login: '/login',
        forgotPass: '/forgot_pass',
        resetPass: '/reset_pass',
        user: (id: string): string => `/user/${id}`,
        userStat: '/user/:id',
    }
}