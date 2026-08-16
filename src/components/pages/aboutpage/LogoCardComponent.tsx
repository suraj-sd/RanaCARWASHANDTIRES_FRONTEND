import { Card } from "@/components/ui/card";

const LogoItem = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="text-3xl">{icon}</div>
      <p className="text-black text-sm sm:text-base font-medium">
        {text}
      </p>
    </div>
  );
};

export default function LogoCardComponent() {
  return (
  <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 -mb-8 relative -top-16">
  <Card className="bg-[#2ea0c9] border-0 shadow-2xl rounded-3xl w-full max-w-5xl">
    <div className="px-6 py-6 sm:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
        
        <LogoItem icon="⚡" text="Quick Service" />
        <LogoItem icon="💧" text="Premium Cleaning" />
        <LogoItem icon="🛠️" text="Expert Technicians" />
        <LogoItem icon="⭐" text="Customer Satisfaction" />

      </div>
    </div>
  </Card>
</div>
  );
}
