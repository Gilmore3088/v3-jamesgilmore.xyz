import Icon from "@/components/icon";
import { site } from "@/content/site";

/** "Things I do" as an icon grid. */
export default function DoList() {
  return (
    <ul className="m-0 grid list-none gap-x-10 gap-y-7 p-0 sm:grid-cols-2">
      {site.about.iDo.map((item) => (
        <li key={item.text} className="flex items-start gap-4">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-accent text-bg">
            <Icon name={item.icon} />
          </span>
          <div className="min-w-0">
            <p className="m-0 text-[1.25rem] font-semibold leading-tight">{item.text}</p>
            <p className="m-0 mt-1 text-[1.02rem] leading-relaxed text-muted">{item.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
