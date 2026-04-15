import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfessionalBlue from '../themes/ProfessionalBlue';
import ElegantGold from '../themes/ElegantGold';
import ModernMinimalist from '../themes/ModernMinimalist';

export default function LivePreview({ school, student, subjects, metrics, config }) {
    // Pass all data down to the selected theme pattern
    const data = { school, student, subjects, metrics, config };

    const renderTheme = () => {
        switch (config.theme) {
            case 'ElegantGold':
                return <ElegantGold {...data} />;
            case 'ModernMinimalist':
                return <ModernMinimalist {...data} />;
            case 'ProfessionalBlue':
            default:
                return <ProfessionalBlue {...data} />;
        }
    };

    // Render scaling & dimensions
    // A4 dimensions: 210 x 297 mm (~ 794 x 1123 px at 96 dpi)
    // For preview, we force a scalable container.

    const widthClasses = config.layout === 'portrait' ? 'w-[794px] min-h-[1123px]' : 'w-[1123px] min-h-[794px]';

    return (
        <div className={`relative bg-white shadow-2xl transition-all duration-300 origin-top overflow-hidden ${widthClasses}`}>
            <div id="live-preview-container" className="w-full h-full bg-white relative z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={config.theme}
                        initial={{ opacity: 0, filter: 'blur(3px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(3px)' }}
                        transition={{ duration: 0.3 }}
                        className={`w-full h-full p-8 box-border flex flex-col`}
                        style={{ fontFamily: config.fontFamily }}
                    >
                        {renderTheme()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
