// Simplified JavaScript for Wix Studio Custom Code
function initTintbotCalculator() {
    const calculatorHTML = `
        <div id="tintbot-calculator" style="
            background: linear-gradient(135deg, #1e293b 0%, #1e40af 50%, #1e293b 100%);
            padding: 2rem;
            border-radius: 1rem;
            color: white;
            font-family: Arial, sans-serif;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #f97316; font-size: 2rem; margin-bottom: 1rem;">AI ROI Calculator</h2>
                <p style="color: #d1d5db;">Enter your shop details and see your potential savings</p>
            </div>
            
            <div id="calculator-form" style="max-width: 600px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Shop Name</label>
                        <input type="text" id="wix-shopName" placeholder="Your Tint Shop" style="
                            width: 100%; padding: 0.75rem; border-radius: 0.5rem; 
                            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                            color: white;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Monthly Leads</label>
                        <input type="number" id="wix-monthlyLeads" placeholder="150" style="
                            width: 100%; padding: 0.75rem; border-radius: 0.5rem; 
                            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                            color: white;
                        ">
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Average Job Value ($)</label>
                        <input type="number" id="wix-avgJobValue" placeholder="450" style="
                            width: 100%; padding: 0.75rem; border-radius: 0.5rem; 
                            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                            color: white;
                        ">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem;">Staff Hourly Rate ($)</label>
                        <input type="number" id="wix-hourlyRate" placeholder="25" style="
                            width: 100%; padding: 0.75rem; border-radius: 0.5rem; 
                            background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
                            color: white;
                        ">
                    </div>
                </div>
                
                <button onclick="calculateWixROI()" style="
                    width: 100%; background: linear-gradient(45deg, #f97316, #ea580c);
                    color: white; padding: 1rem; border: none; border-radius: 0.5rem;
                    font-size: 1.1rem; font-weight: bold; cursor: pointer;
                    margin-bottom: 2rem;
                ">
                    Calculate My ROI & See AI Demo
                </button>
                
                <div id="wix-results" style="display: none;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h3 style="color: #f97316; font-size: 1.5rem;">Your Monthly Savings:</h3>
                        <div id="wix-totalSavings" style="font-size: 2.5rem; font-weight: bold; color: #10b981;"></div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
                            <div id="wix-timesSaved" style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;"></div>
                            <div style="font-size: 0.8rem; color: #d1d5db;">Hours Saved/Week</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
                            <div id="wix-leadsFiltered" style="font-size: 1.5rem; font-weight: bold; color: #10b981;"></div>
                            <div style="font-size: 0.8rem; color: #d1d5db;">Bad Leads Filtered</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
                            <div id="wix-bookingIncrease" style="font-size: 1.5rem; font-weight: bold; color: #f97316;"></div>
                            <div style="font-size: 0.8rem; color: #d1d5db;">Booking Rate ↑</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.5rem; text-align: center;">
                            <div id="wix-roi" style="font-size: 1.5rem; font-weight: bold; color: #8b5cf6;"></div>
                            <div style="font-size: 0.8rem; color: #d1d5db;">Monthly ROI</div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 2rem;">
                        <a href="mailto:hello@tintbot.ai" style="
                            background: linear-gradient(45deg, #f97316, #ea580c);
                            color: white; padding: 1rem 2rem; text-decoration: none;
                            border-radius: 0.5rem; font-weight: bold;
                        ">
                            Start Free Trial
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', calculatorHTML);
}

function calculateWixROI() {
    const leads = parseInt(document.getElementById('wix-monthlyLeads').value) || 0;
    const jobValue = parseInt(document.getElementById('wix-avgJobValue').value) || 0;
    const hourlyRate = parseInt(document.getElementById('wix-hourlyRate').value) || 0;
    const shopName = document.getElementById('wix-shopName').value;
    
    if (!shopName || !leads) {
        alert('Please fill in your shop name and monthly leads');
        return;
    }
    
    // Calculate ROI
    const timesSaved = Math.round((leads * 0.3) / 4);
    const leadsFiltered = Math.round(leads * 0.6);
    const bookingIncrease = 35; // 35% increase
    const monthlySavings = Math.round(timesSaved * 4 * hourlyRate + (leads * 0.35 * jobValue * 0.1));
    const roi = Math.round((monthlySavings / 249) * 100);
    
    // Show results
    document.getElementById('wix-results').style.display = 'block';
    document.getElementById('wix-totalSavings').textContent = '$' + monthlySavings.toLocaleString();
    document.getElementById('wix-timesSaved').textContent = timesSaved;
    document.getElementById('wix-leadsFiltered').textContent = leadsFiltered;
    document.getElementById('wix-bookingIncrease').textContent = '+' + bookingIncrease + '%';
    document.getElementById('wix-roi').textContent = roi + '%';
    
    // Scroll to results
    document.getElementById('wix-results').scrollIntoView({ behavior: 'smooth' });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTintbotCalculator);
} else {
    initTintbotCalculator();
}
