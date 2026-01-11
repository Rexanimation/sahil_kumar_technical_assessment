import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NODE_STYLES } from './constants';

function NoteNode({ data, selected }: NodeProps) {
    return (
        <div
            className={cn(
                `pipeline-node min-w-[200px] bg-yellow-100/10 border-yellow-200/20 ${NODE_STYLES.GPU}`,
                selected && `selected ${NODE_STYLES.SELECTED_RING}`
            )}
        >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-yellow-200/20 bg-yellow-500/10">
                <StickyNote className="w-4 h-4 text-yellow-500" />
                <span className="font-display font-semibold text-sm text-yellow-500">Note</span>
            </div>
            <div className="p-3">
                <textarea
                    className="w-full h-24 bg-transparent resize-none focus:outline-none text-sm font-handwriting text-yellow-100/90 placeholder:text-yellow-100/50"
                    placeholder="Add a note..."
                    defaultValue={data.text}
                />
            </div>
        </div>
    );
}

export default memo(NoteNode);
