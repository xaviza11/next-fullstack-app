
import { es, enBackend, esBackend, en } from "@/locales";

export default function routerLanguage(language:string):any{
    try{
    if(language === 'en') return enBackend
    if(language === 'es') return esBackend
     }catch(error){
        return enBackend
    }
}