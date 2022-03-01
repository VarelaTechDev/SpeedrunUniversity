import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'

import UserContext from '../context/UserContext'
import domain from '../util/domain'

import './Home.scss'
import logo from '../images/MySRUlogo.png'

const Axios = require('axios')

function Home(){
    
    
    return(
        <>
            {/* <div class="flex h-screen bg-green-300"> */}
            <div>
                <div class="flex-1 flex flex-col overflow-hidden">
                    
                    <header class="flex justify-between items-center bg-blue-300 p-4">  
                        <img src={logo} alt="" />
                        <div class="flex">Right</div>
                    </header>

                    <div class="flex h-full">
                        
                        {/* This is the left sidebar :: Look to make this a componenet soon */}
                        <nav class="flex w-72 h-full bg-pink-500">
                            <div class="w-full flex mx-auto px-6 py-8">
                                <div class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">Sidebar</div>
                            </div>
                        </nav>
                        
                        {/* This is the center :: Green */}
                        <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
                            <div class="flex w-full mx-auto px-6 py-8">
                                <div class="flex flex-col w-full h-full text-gray-900 text-xl">
                                    
                                    <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400">
                                        {/* Place the image here */}

                                    </div>

                                    <div class="flex w-full max-w-xl h-60 items-center justify-center mx-auto bg-green-400 border-b border-gray-600">
                                        {/* Place the Campus Annoucment along with campus info */}
                                    </div>
                                    
                                </div>
                            </div>
                        </main>
                        
                        {/* This is the right side */}
                        <nav class="flex w-72 h-full bg-yellow-400">
                            <div class="w-full flex mx-auto px-6 py-8">
                                <div class="w-full h-full flex items-center justify-center text-gray-900 text-xl border-4 border-gray-900 border-dashed">Rightbar</div>
                            </div>
                        </nav>
                    
                    </div>
                </div>
            </div>
        </>    
    )
}

export default Home