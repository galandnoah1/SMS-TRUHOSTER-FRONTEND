export default function getCurrentTime()
{
    const date = new Date()
    const time = date.toLocaleTimeString()
    return time;
}