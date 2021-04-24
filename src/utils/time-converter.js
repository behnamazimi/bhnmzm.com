export default function timeConverter(UNIX_timestamp, withTime = false) {
   let a = new Date(UNIX_timestamp * 1000)
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
   let year = a.getFullYear()
   let month = months[a.getMonth()]
   let date = a.getDate()
   let hour = a.getHours()
   let min = a.getMinutes()
   let sec = a.getSeconds()
   if (withTime)
      return date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec
   return date + " " + month + " " + year
}
