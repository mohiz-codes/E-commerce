import { IoChevronForward } from "react-icons/io5";

function Breadcrumb({items}) {


    return(
        
        <div className="max-w-[1240px] w-full mx-auto flex items-center gap-2 text-[16px] pt-[48px] pb-[36px]">
           {items.map((item,index) => (
            <>
            
             <span className="text-[#00000099]">{item}</span>
            
              {index != items.length -1  &&   <IoChevronForward  className=""/>}
             
            
            </>
           ))}
           
         </div>     
       
    
    )
}
export default Breadcrumb