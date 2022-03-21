module.exports={
    resolve:{
        fallback:{
            buffer: require.resolve("buffer/"),
            util: require.resolve("util/")
        }
    },
}