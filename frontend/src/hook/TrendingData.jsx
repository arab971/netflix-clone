import axios from "axios"
import contentstore  from "../store/content.js"
import { useEffect, useState } from "react"
 const TrendingData = () => {
 const [trendingData, setTrendingData] = useState()
 const {contentType} = contentstore()
 useEffect(() => {
    const gettrendingData = async () => {
        const res = await axios.get(`http://localhost:3000/api/v1/${contentType}/trending`)
        setTrendingData(res.data.content)
    }
   gettrendingData()
 },[contentType])
 return(trendingData)
}
export default TrendingData

 