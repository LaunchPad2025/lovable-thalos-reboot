import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const exportApprovedMediaEntries = async () => {
    try {
        const { data, error } = await supabase
            .from('media_training_dataset')
            .select('*')
            .eq('status', 'approved');

        if (error) {
            console.error('Error fetching approved media entries:', error);
            return;
        }

        const formattedData = data.map(entry => ({
            media_type: entry.media_type,
            cue_type: entry.cue_type,
            description: entry.description,
            regulation_code: entry.regulation_code,
            keywords: entry.keywords,
            industry: entry.industry,
            labels: entry.labels
        }));

        const filePath = './approved_media_entries.json';
        fs.writeFileSync(filePath, JSON.stringify(formattedData, null, 2));
        console.log(`Exported ${formattedData.length} media entries to ${filePath}`);
    } catch (err) {
        console.error('Error exporting approved media entries:', err);
    }
};

exportApprovedMediaEntries();
