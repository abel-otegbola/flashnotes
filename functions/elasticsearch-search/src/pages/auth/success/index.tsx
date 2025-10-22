import React from 'react'
import LogoIcon from '../../../assets/icons/logo'
import BlurReveal from '../../../components/animations/blurReveal'

function SuccessPage() {
    return (
        
        <div className="flex md:w-[55%] h-screen w-full items-center justify-center">
            <div className="sm:w-[400px] md:mx-0 mx-auto w-full p-6">
                <div className="flex flex-col justify-center gap-6 md:p-[5%]">
                    <LogoIcon />
                    
                    <BlurReveal preset="slide-right">
                        <h1 className='md:text-[32px] text-[20px] font-semibold leading-[120%]'>You have been added to our waitlist</h1>
                    </BlurReveal>
                    
                    <BlurReveal preset="slide-right">
                        <p>Thank you for joining. You will be the first to know when we are ready</p>
                    </BlurReveal>

                    <div className="py-4 flex flex-col gap-4">
                        <BlurReveal preset="slide-right">
                            <p>You are not alone. We are glad you joined</p>
                        </BlurReveal>
                        <img src="/users.png" alt="users" width={220} height={36} className="" />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SuccessPage