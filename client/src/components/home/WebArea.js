// > This will be our home page and hold everything together
import React, {useState, useEffect, useContext} from "react";

import Header from './Header'

import './WebArea.scss'

function Home(){
    return(
        <section className='web-area'>
            <Header/>
        </section>
    )
}

export default Home