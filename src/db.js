import pg from 'pg'


const {Pool} = pg

const connection = new Pool(
    connectionUrl = process.env.DATABASE_URL
)

export {connection}