const express = require('express')
const nunjucks = require('nunjucks')
const pg = require('pg')

const app = express()

//config connect db
const config = {
    user: 'postgres',
    database: 'bookstore',
    password: 'hadang',
    host: 'localhost',
    port: '5432',
    max: 10,
    idleTimeoutMillis: 30000,
}

const pool = new pg.Pool(config)

app.use(express.static('public'))
//config nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get('/', (req, res) => {
    let menu, list1, list2, list3, list5, list6, list7, list8, list9, list11, list15;
    let lists, books
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('select * from category', (err, result) => {
            done()
            if (err) {
                res.end();
                return console.error('error running query', err)
            }
            lists = result.rows
            pool.connect((err, client, done) => {
                if (err) {
                    return console.error('error fetching client from pool', err)
                }
                client.query('select title, author, description, image from book limit 10', (err, result) => {
                    done()
                    if (err) {
                        res.end()
                        return console.error('error running query', err)
                    }
                    books = result.rows
                    // console.log(books)
                    //Filter result to lists

                    //Main menu
                    menu = lists.filter((category) => {
                        return category.parent_id === null
                    })

                    //submenu1
                    list1 = lists.filter((category) => {
                        return category.parent_id === 1
                    })

                    //submenu2
                    list2 = lists.filter((category) => {
                        return category.parent_id === 2
                    })

                    //submenu3
                    list3 = lists.filter((category) => {
                        return category.parent_id === 3
                    })

                    //submenu5
                    list5 = lists.filter((category) => {
                        return category.parent_id === 5
                    })

                    //submenu6
                    list6 = lists.filter((category) => {
                        return category.parent_id === 6
                    })

                    //submenu7
                    list7 = lists.filter((category) => {
                        return category.parent_id === 7
                    })

                    //submenu8
                    list8 = lists.filter((category) => {
                        return category.parent_id === 8
                    })

                    //submenu9
                    list9 = lists.filter((category) => {
                        return category.parent_id === 9
                    })

                    //submenu11
                    list11 = lists.filter((category) => {
                        return category.parent_id === 11
                    })

                    //submenu 15
                    list15 = lists.filter((category) => {
                        return category.parent_id === 15
                    })
                    res.render('index.html', {
                        menu: menu,
                        list1: list1,
                        list2: list2,
                        list3: list3,
                        list5: list5,
                        list6: list6,
                        list7: list7,
                        list8: list8,
                        list9: list9,
                        list11: list11,
                        list15: list15,
                        books: books
                    })
                })
            })


        })
    })
})

app.get('/author/:id', (req, res) => {
    res.send(req.params.id)
})


app.get('/:category', (req, res) => {
    let category = req.params.category
    let menu, list1, list2, list3, list5, list6, list7, list8, list9, list11, list15;
    let lists, books
    let check


    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('select * from category', (err, result) => {
            done()
            if (err) {
                res.end();
                return console.error('error running query', err)
            }
            lists = result.rows
            //Filter result from lists
            //submenu1
            list1 = lists.filter((category) => {
                return category.parent_id === 1
            })

            //submenu2
            list2 = lists.filter((category) => {
                return category.parent_id === 2
            })

            //submenu3
            list3 = lists.filter((category) => {
                return category.parent_id === 3
            })

            //submenu5
            list5 = lists.filter((category) => {
                return category.parent_id === 5
            })

            //submenu6
            list6 = lists.filter((category) => {
                return category.parent_id === 6
            })

            //submenu7
            list7 = lists.filter((category) => {
                return category.parent_id === 7
            })

            //submenu8
            list8 = lists.filter((category) => {
                return category.parent_id === 8
            })

            //submenu9
            list9 = lists.filter((category) => {
                return category.parent_id === 9
            })

            //submenu11
            list11 = lists.filter((category) => {
                return category.parent_id === 11
            })

            //submenu 15
            list15 = lists.filter((category) => {
                return category.parent_id === 15
            })
            //Handle book detail
            menu = lists.filter((category) => {
                return category.parent_id === null
            })
            check = menu.find(cat => cat.name === category)
            if (!check) {
                pool.connect((err, client, done) => {
                    if (err) {
                        return console.error('error fetching client from pool', err)
                    }
                    client.query("select * from book where title = '" + category + "'", (err, result) => {
                        done()
                        if (err) {
                            res.end()
                            return console.error('error running query', err)
                        }
                        // console.log(result.rows[0])
                        res.render('detail.html',{
                            book: result.rows[0],
                            menu: menu,
                            list1: list1,
                            list2: list2,
                            list3: list3,
                            list5: list5,
                            list6: list6,
                            list7: list7,
                            list8: list8,
                            list9: list9,
                            list11: list11,
                            list15: list15
                        })
                    })
                })
            }
            else {
                pool.connect((err, client, done) => {
                    if (err) {
                        return console.error('error fetching client from pool', err)
                    }
                    client.query("select title, author, description, image from book where top_category = '" + category + "'", (err, result) => {
                        done()
                        if (err) {
                            res.end()
                            return console.error('error running query', err)
                        }
                        books = result.rows
                        res.render('index.html', {
                            menu: menu,
                            list1: list1,
                            list2: list2,
                            list3: list3,
                            list5: list5,
                            list6: list6,
                            list7: list7,
                            list8: list8,
                            list9: list9,
                            list11: list11,
                            list15: list15,
                            books: books
                        })
                    })
                })
            }
        })
    })
})

app.get('/:category/:id', (req, res) => {
    let id1 = req.params.category
    let id2 = req.params.id
    let menu, list1, list2, list3, list5, list6, list7, list8, list9, list11, list15;
    let lists, books
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query('select * from category', (err, result) => {
            done()
            if (err) {
                res.end();
                return console.error('error running query', err)
            }
            lists = result.rows
            pool.connect((err, client, done) => {
                if (err) {
                    return console.error('error fetching client from pool', err)
                }
                client.query("select title, author, description, image from book where top_category = '" + id1 + "' and category = '{" + id2 + "}'", (err, result) => {
                    done()
                    if (err) {
                        res.end()
                        return console.error('error running query', err)
                    }
                    books = result.rows
                    //Filter result to lists

                    //Main menu
                    menu = lists.filter((category) => {
                        return category.parent_id === null
                    })

                    //submenu1
                    list1 = lists.filter((category) => {
                        return category.parent_id === 1
                    })

                    //submenu2
                    list2 = lists.filter((category) => {
                        return category.parent_id === 2
                    })

                    //submenu3
                    list3 = lists.filter((category) => {
                        return category.parent_id === 3
                    })

                    //submenu5
                    list5 = lists.filter((category) => {
                        return category.parent_id === 5
                    })

                    //submenu6
                    list6 = lists.filter((category) => {
                        return category.parent_id === 6
                    })

                    //submenu7
                    list7 = lists.filter((category) => {
                        return category.parent_id === 7
                    })

                    //submenu8
                    list8 = lists.filter((category) => {
                        return category.parent_id === 8
                    })

                    //submenu9
                    list9 = lists.filter((category) => {
                        return category.parent_id === 9
                    })

                    //submenu11
                    list11 = lists.filter((category) => {
                        return category.parent_id === 11
                    })

                    //submenu 15
                    list15 = lists.filter((category) => {
                        return category.parent_id === 15
                    })
                    res.render('index.html', {
                        menu: menu,
                        list1: list1,
                        list2: list2,
                        list3: list3,
                        list5: list5,
                        list6: list6,
                        list7: list7,
                        list8: list8,
                        list9: list9,
                        list11: list11,
                        list15: list15,
                        books: books
                    })
                })
            })
        })
    })
})


app.listen(3000, () => {
    console.log('Listening on port 3000')
})