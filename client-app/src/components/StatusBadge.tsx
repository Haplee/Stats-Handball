import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    "px-2 py-0.5 rounded text-[10px] uppercase font-bold border",
    {
        variants: {
            status: {
                completed: "text-green-400 bg-green-500/10 border-green-500/20",
                processing: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                failed: "text-red-400 bg-red-500/10 border-red-500/20",
                pending: "text-gray-400 bg-gray-500/10 border-gray-500/20",
            }
        },
        defaultVariants: {
            status: "pending"
        }
    }
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
    status: 'completed' | 'processing' | 'failed' | 'pending';
}

export function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={badgeVariants({ status })}>
            {status === 'completed' && 'Completado'}
            {status === 'processing' && 'Procesando'}
            {status === 'failed' && 'Fallido'}
            {status === 'pending' && 'Pendiente'}
        </span>
    );
}
