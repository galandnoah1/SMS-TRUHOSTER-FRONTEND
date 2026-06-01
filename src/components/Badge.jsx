

export default function Badge({color, children})
{
    return <span className={`badge badge-${color}`}>{children}</span>
}