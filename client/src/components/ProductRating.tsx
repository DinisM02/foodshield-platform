import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ProductRatingProps {
  productId: number;
  showCount?: boolean;
}

export default function ProductRating({ productId, showCount = true }: ProductRatingProps) {
  const { data: rating } = trpc.reviews.average.useQuery({ productId });

  if (!rating || rating.count === 0) {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-400">
        <Star size={16} />
        <span>Sem avaliações</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= Math.round(rating.average)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {rating.average.toFixed(1)}
      </span>
      {showCount && (
        <span className="text-sm text-gray-500">
          ({rating.count})
        </span>
      )}
    </div>
  );
}
