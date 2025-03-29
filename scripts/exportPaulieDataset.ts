import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const exportApprovedEntries = async () => {
    try {
        const { data, error } = await supabase
            .from('paulie_queries')
            .select('*')
            .eq('status', 'approved');

        if (error) {
            console.error('Error fetching approved entries:', error);
            return;
        }

        const filePath = './approved_entries.json';
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Exported ${data.length} entries to ${filePath}`);
    } catch (err) {
        console.error('Error exporting approved entries:', err);
    }
};

exportApprovedEntries();
