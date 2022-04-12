// > <Route exact path='/' element={<HomeArea/>}/>
import React, {useState, useEffect, useContext} from "react";

import Header from './Header'

import './HomeAreaHeader.scss'

function Home(){
    return(
        <section className='web-area'>
            <Header/>
        </section>
    )
}

export default Home