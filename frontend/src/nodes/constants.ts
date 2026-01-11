/**
 * Common styling constants for nodes
 */
export const NODE_STYLES = {
    // Base dimensions
    MIN_WIDTH: 'min-w-[200px]',
    MAX_WIDTH: 'max-w-[300px]',

    // Selection
    SELECTED_RING: 'ring-2 ring-blue-500',

    // Handles
    HANDLE_BASE: '!w-3.5 !h-3.5',
    HANDLE_HOVER: 'hover:!w-4 hover:!h-4 transition-all',

    // GPU Acceleration
    GPU: 'gpu-accelerated',
} as const;
