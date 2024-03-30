import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <div className="flex h-5 items-center justify-center space-x-4 text-sm border-t border-border">
      <p>By <a href="https://twitter.com/NioZow">NioZ</a></p>
      <Separator orientation="vertical" />
      <p>Privacy policy</p>
      <Separator orientation="vertical" />
      <p>Contribute on <a href="https://github.com/NioZow/thehackerlibrary">github</a></p>
    </div>
  )
}

export default Footer