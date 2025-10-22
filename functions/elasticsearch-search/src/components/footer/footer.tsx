import LogoIcon from "../../assets/icons/logo"


function Footer() {
  return (
    <div className="py-12 flex md:flex-row flex-col gap-6 md:justify-between items-center md:px-9 p-4 ">
        <div className="sm:w-[10%] text-start flex md:flex-row flex-col gap-2 items-center">
            <LogoIcon />
            <h3 className="text-[16px] font-bold bg-gradient-to-r bg-clip-text text-transparent from-primary to-fuchsia-400">flashtasks</h3>
        </div>

        <p>Focus. Flow. Finish</p>
    </div>
  )
}

export default Footer