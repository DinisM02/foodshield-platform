import { useState } from "react";
import { Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: reviews, refetch } = trpc.reviews.list.useQuery({ productId });
  const createReview = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success(t('common.success'));
      setRating(0);
      setComment("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || t('reviews.error_submit'));
    },
  });

  const handleSubmit = () => {
    if (!user) {
      toast.error(t('reviews.login_required'));
      return;
    }
    if (rating === 0) {
      toast.error(t('reviews.rating_required'));
      return;
    }
    createReview.mutate({ productId, rating, comment: comment || undefined });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Avaliações</h3>

      {/* Review Form */}
      {user && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h4 className="font-medium">Deixe sua avaliação</h4>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Classificação:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={24}
                    className={
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder="Compartilhe sua experiência com este produto (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />

          <Button
            onClick={handleSubmit}
            disabled={createReview.isPending || rating === 0}
          >
            {createReview.isPending ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {!reviews || reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Ainda não há avaliações para este produto.
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{review.userName || "Usuário"}</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={
                          star <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString("pt-MZ")}
                </span>
              </div>
              {review.comment && (
                <p className="text-gray-700 mt-2">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
