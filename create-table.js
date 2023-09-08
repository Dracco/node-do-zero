import {sql} from './db.js'

sql`
create table videos(
  title text,
  description text,
  duration integer

);
`
