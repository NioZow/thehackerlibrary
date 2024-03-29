import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <p>By <a href="https://twitter.com/NioZow">NioZ</a></p>
        <Separator orientation="vertical" />
        <p>Privacy policy</p>
        <Separator orientation="vertical" />
        <p>Contribute on <a href="https://github.com/NioZow/thehackerlibrary">github</a></p>
      </div>
    </div>
  )
}

export default Footer