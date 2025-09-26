// Shared JavaScript functionality

// Reveal nav on scroll
function initNavbar() {
	const topnav = document.getElementById('topnav');
	if (!topnav) return;
	
	let lastY = 0;
	window.addEventListener('scroll', () => {
		const y = window.scrollY || document.documentElement.scrollTop;
		if (y > 40) { 
			topnav.classList.add('visible'); 
		} else { 
			topnav.classList.remove('visible'); 
		}
		lastY = y;
	});
}

// Set current year
function setCurrentYear() {
	const yearElement = document.getElementById('year');
	if (yearElement) {
		yearElement.textContent = new Date().getFullYear();
	}
}

// Brand image scroll animation
function initBrandImageAnimation() {
	const brandImage = document.querySelector('.brand-image');
	const heroSection = document.querySelector('.hero');
	
	if (!brandImage || !heroSection) return;
	
	function checkScrollPosition() {
		const scrollY = window.scrollY || document.documentElement.scrollTop;
		const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
		
		// Show image when we've scrolled past the hero section
		if (scrollY >= heroBottom) {
			brandImage.style.opacity = '1';
			brandImage.style.visibility = 'visible';
		} else {
			brandImage.style.opacity = '0';
			brandImage.style.visibility = 'hidden';
		}
	}
	
	window.addEventListener('scroll', checkScrollPosition);
	window.addEventListener('load', checkScrollPosition);
}

// Contact form submission
function initContactForm() {
	const form = document.querySelector('form');
	if (!form) return;
	
	form.addEventListener('submit', function(e) {
		e.preventDefault();
		alert('Thank you for your message. I will get back to you soon.');
		this.reset();
	});
}

// Contact section background animation
function initContactBackgroundAnimation() {
	const contactSection = document.querySelector('.contact-section');
	if (!contactSection) return;
	
	window.addEventListener('load', function() {
		setTimeout(() => {
			contactSection.classList.add('loaded');
		}, 1000);
	});
}

// Globe visualization (Work page)
function initGlobeVisualization() {
	const globeContainer = document.getElementById('globeViz');
	if (!globeContainer) return;
	
	// This would contain the React globe component code
	// For now, we'll just ensure the container exists
	console.log('Globe container initialized');
}

// Resume popup functionality
function initResumePopup() {
	const resumeLinks = document.querySelectorAll('a[href*="Paul McConnell Portfolio"]');
	
	resumeLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			showResumePopup();
		});
	});
}

function showResumePopup() {
	// Create popup overlay
	const overlay = document.createElement('div');
	overlay.style.cssText = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	`;
	
	// Create popup content
	const popup = document.createElement('div');
	popup.style.cssText = `
		background: rgba(255, 255, 255, 0.95);
		padding: 40px;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
		max-width: 400px;
		width: 90%;
		text-align: center;
	`;
	
	popup.innerHTML = `
		<h3 style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-weight: 500;">RÉSUMÉ Options</h3>
		<p style="margin: 0 0 30px 0; color: #666;">How would you like to access Paul's résumé?</p>
		<div style="display: flex; gap: 16px; justify-content: center;">
			<button id="viewResume" style="
				background: #111;
				color: white;
				border: none;
				padding: 12px 24px;
				border-radius: 4px;
				font-family: inherit;
				font-size: 14px;
				font-weight: 500;
				cursor: pointer;
				transition: background 0.2s ease;
			">View Online</button>
			<button id="downloadResume" style="
				background: #2f4f4f;
				color: white;
				border: none;
				padding: 12px 24px;
				border-radius: 4px;
				font-family: inherit;
				font-size: 14px;
				font-weight: 500;
				cursor: pointer;
				transition: background 0.2s ease;
			">Download PDF</button>
		</div>
		<button id="closePopup" style="
			position: absolute;
			top: 16px;
			right: 16px;
			background: none;
			border: none;
			font-size: 24px;
			cursor: pointer;
			color: #666;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
		">×</button>
	`;
	
	popup.style.position = 'relative';
	overlay.appendChild(popup);
	document.body.appendChild(overlay);
	
	// Add hover effects
	const viewBtn = popup.querySelector('#viewResume');
	const downloadBtn = popup.querySelector('#downloadResume');
	
	viewBtn.addEventListener('mouseenter', () => viewBtn.style.background = '#333');
	viewBtn.addEventListener('mouseleave', () => viewBtn.style.background = '#111');
	
	downloadBtn.addEventListener('mouseenter', () => downloadBtn.style.background = '#1f3f3f');
	downloadBtn.addEventListener('mouseleave', () => downloadBtn.style.background = '#2f4f4f');
	
	// Event handlers
	viewBtn.addEventListener('click', () => {
		window.open('Paul McConnell Portfolio 1-9-2025 3.pdf', '_blank');
		document.body.removeChild(overlay);
	});
	
	downloadBtn.addEventListener('click', () => {
		const link = document.createElement('a');
		link.href = 'Paul McConnell Portfolio 1-9-2025 3.pdf';
		link.download = 'Paul McConnell Resume.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		document.body.removeChild(overlay);
	});
	
	popup.querySelector('#closePopup').addEventListener('click', () => {
		document.body.removeChild(overlay);
	});
	
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) {
			document.body.removeChild(overlay);
		}
	});
}

// Initialize all functionality
function init() {
	initNavbar();
	setCurrentYear();
	initBrandImageAnimation();
	initContactForm();
	initContactBackgroundAnimation();
	initGlobeVisualization();
	initResumePopup();
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
