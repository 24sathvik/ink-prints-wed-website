export function ProductSkeleton() {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            <div className="aspect-[3/4] bg-[#E8E0D5]/30 rounded-2xl w-full" />
            <div className="space-y-3">
                <div className="h-4 bg-[#E8E0D5]/30 rounded w-3/4" />
                <div className="h-3 bg-[#E8E0D5]/30 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-[#E8E0D5]/30 rounded w-20" />
                    <div className="h-8 w-8 bg-[#E8E0D5]/30 rounded-full" />
                </div>
            </div>
        </div>
    );
}
