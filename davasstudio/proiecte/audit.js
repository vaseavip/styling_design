// Website Audit Tool - JavaScript Logic

class WebsiteAudit {
  constructor() {
    this.form = document.getElementById('auditForm');
    this.urlInput = document.getElementById('urlInput');
    this.loadingState = document.getElementById('loadingState');
    this.resultsSection = document.getElementById('resultsSection');
    this.errorMessage = document.getElementById('errorMessage');
    this.newAuditBtn = document.getElementById('newAuditBtn');

    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.newAuditBtn.addEventListener('click', () => this.resetForm());
  }

  handleSubmit(e) {
    e.preventDefault();

    const url = this.urlInput.value.trim();

    if (!this.validateURL(url)) {
      this.showError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    this.performAudit(url);
  }

  validateURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  async performAudit(url) {
    this.hideError();
    this.hideResults();
    this.showLoading();

    // Simulate delay
    await this.sleep(1500);

    const auditData = this.generateAuditData(url);

    this.hideLoading();
    this.renderResults(auditData);
  }

  renderResults(data) {
    // Ensure results section is visible
    this.showResults();

    // Set overall score
    document.getElementById('overallScore').textContent = data.overallScore;
    this.updateScoreTitle(data.overallScore);
    this.updateProgressRing(data.overallScore);

    // Update Performance Card
    document.getElementById('perfScore').textContent = data.performance.score;
    document.getElementById('loadTime').textContent = data.performance.loadTime;
    this.updateRecommendations('perf', data.performance.recommendations);

    // Update SEO Card
    document.getElementById('seoScore').textContent = data.seo.score;
    document.getElementById('metaTags').textContent = data.seo.metaTags;
    this.updateRecommendations('seo', data.seo.recommendations);

    // Update Mobile Card
    document.getElementById('mobileScore').textContent = data.mobile.score;
    document.getElementById('responsive').textContent = data.mobile.responsive;
    this.updateRecommendations('mobile', data.mobile.recommendations);

    // Update UX Card
    document.getElementById('uxScore').textContent = data.ux.score;
    document.getElementById('accessibility').textContent =
      data.ux.accessibility;
    this.updateRecommendations('ux', data.ux.recommendations);

    // Update Security Card
    document.getElementById('secScore').textContent = data.security.score;
    document.getElementById('https').textContent = data.security.https;
    this.updateRecommendations('sec', data.security.recommendations);

    // Update Accessibility Card
    document.getElementById('a11yScore').textContent = data.a11y.score;
    document.getElementById('wcag').textContent = data.a11y.wcag;
    this.updateRecommendations('a11y', data.a11y.recommendations);
  }

  showResults() {
    this.resultsSection.classList.remove('hidden');
    this.resultsSection.classList.add('visible');
    this.resultsSection.style.display = 'block';
  }

  hideResults() {
    this.resultsSection.classList.remove('visible');
    this.resultsSection.classList.add('hidden');
    this.resultsSection.style.display = 'none';
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  generateAuditData(url) {
    // Generate deterministic but varied scores based on URL
    const urlHash = this.hashURL(url);

    // Base scores with variation
    const perfBase = 70 + (urlHash % 25);
    const seoBase = 65 + ((urlHash * 2) % 30);
    const mobileBase = 75 + ((urlHash * 3) % 20);
    const uxBase = 70 + ((urlHash * 4) % 25);
    const secBase = 85 + ((urlHash * 5) % 15);
    const a11yBase = 65 + ((urlHash * 6) % 30);

    // Calculate overall score
    const overallScore = Math.round(
      (perfBase + seoBase + mobileBase + uxBase + secBase + a11yBase) / 6,
    );

    return {
      url,
      overallScore,
      performance: {
        score: perfBase,
        loadTime: (1.5 + (urlHash % 3)).toFixed(1) + 's',
        recommendations: this.getPerformanceRecs(perfBase),
      },
      seo: {
        score: seoBase,
        metaTags: seoBase > 75 ? 'Complete' : 'Partial',
        recommendations: this.getSEORecs(seoBase),
      },
      mobile: {
        score: mobileBase,
        responsive: mobileBase > 70 ? 'Yes' : 'Needs Work',
        recommendations: this.getMobileRecs(mobileBase),
      },
      ux: {
        score: uxBase,
        accessibility: uxBase > 75 ? 'Excellent' : 'Good',
        recommendations: this.getUXRecs(uxBase),
      },
      security: {
        score: secBase,
        https: secBase > 80 ? 'Active' : 'Weak',
        recommendations: this.getSecurityRecs(secBase),
      },
      a11y: {
        score: a11yBase,
        wcag: this.getWCAGLevel(a11yBase),
        recommendations: this.getA11yRecs(a11yBase),
      },
    };
  }

  hashURL(url) {
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  }

  getPerformanceRecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ Optimize image sizes');
      recs.push('⚠ Enable gzip compression');
      recs.push('⚠ Minimize CSS/JS files');
    } else if (score < 80) {
      recs.push('✓ Optimize image sizes');
      recs.push('✓ Enable gzip compression');
      recs.push('⚠ Minimize CSS/JS files');
    } else {
      recs.push('✓ Optimize image sizes');
      recs.push('✓ Enable gzip compression');
      recs.push('✓ Minimize CSS/JS files');
    }
    return recs;
  }

  getSEORecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ Title tag: Missing or weak');
      recs.push('⚠ Meta description: Missing');
      recs.push('⚠ Schema markup: Missing');
    } else if (score < 80) {
      recs.push('✓ Title tag: Present');
      recs.push('✓ Meta description: Present');
      recs.push('⚠ Schema markup: Missing');
    } else {
      recs.push('✓ Title tag: Present');
      recs.push('✓ Meta description: Present');
      recs.push('✓ Schema markup: Present');
    }
    return recs;
  }

  getMobileRecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ Mobile optimized: No');
      recs.push('⚠ Touch friendly: No');
      recs.push('⚠ Viewport configured: No');
    } else if (score < 80) {
      recs.push('✓ Mobile optimized: Yes');
      recs.push('✓ Touch friendly: Yes');
      recs.push('⚠ Viewport configured: Partial');
    } else {
      recs.push('✓ Mobile optimized: Yes');
      recs.push('✓ Touch friendly: Yes');
      recs.push('✓ Viewport configured: Yes');
    }
    return recs;
  }

  getUXRecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ Clear navigation: No');
      recs.push('⚠ Good contrast ratio: No');
      recs.push('⚠ ARIA labels: Missing');
    } else if (score < 80) {
      recs.push('✓ Clear navigation: Yes');
      recs.push('✓ Good contrast ratio: Yes');
      recs.push('⚠ ARIA labels: Partial');
    } else {
      recs.push('✓ Clear navigation: Yes');
      recs.push('✓ Good contrast ratio: Yes');
      recs.push('✓ ARIA labels: Complete');
    }
    return recs;
  }

  getSecurityRecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ HTTPS: Not enabled');
      recs.push('⚠ Security headers: Missing');
      recs.push('⚠ Mixed content: Present');
    } else if (score < 80) {
      recs.push('✓ HTTPS: Enabled');
      recs.push('⚠ Security headers: Partial');
      recs.push('✓ Mixed content: None');
    } else {
      recs.push('✓ HTTPS: Enabled');
      recs.push('✓ Security headers: Complete');
      recs.push('✓ Mixed content: None');
    }
    return recs;
  }

  getA11yRecs(score) {
    const recs = [];
    if (score < 60) {
      recs.push('⚠ Color contrast: Poor');
      recs.push('⚠ Keyboard navigation: No');
      recs.push('⚠ Alt text: Missing');
    } else if (score < 80) {
      recs.push('✓ Color contrast: Good');
      recs.push('✓ Keyboard navigation: Yes');
      recs.push('⚠ Alt text: Partial');
    } else {
      recs.push('✓ Color contrast: Excellent');
      recs.push('✓ Keyboard navigation: Full');
      recs.push('✓ Alt text: Complete');
    }
    return recs;
  }

  getWCAGLevel(score) {
    if (score < 50) return 'Below Level A';
    if (score < 70) return 'Level A';
    if (score < 85) return 'Level AA';
    return 'Level AAA';
  }

  displayResults(data) {
    // Set overall score
    document.getElementById('overallScore').textContent = data.overallScore;
    this.updateScoreTitle(data.overallScore);
    this.updateProgressRing(data.overallScore);

    // Update Performance Card
    document.getElementById('perfScore').textContent = data.performance.score;
    document.getElementById('loadTime').textContent = data.performance.loadTime;
    this.updateRecommendations('perf', data.performance.recommendations);

    // Update SEO Card
    document.getElementById('seoScore').textContent = data.seo.score;
    document.getElementById('metaTags').textContent = data.seo.metaTags;
    this.updateRecommendations('seo', data.seo.recommendations);

    // Update Mobile Card
    document.getElementById('mobileScore').textContent = data.mobile.score;
    document.getElementById('responsive').textContent = data.mobile.responsive;
    this.updateRecommendations('mobile', data.mobile.recommendations);

    // Update UX Card
    document.getElementById('uxScore').textContent = data.ux.score;
    document.getElementById('accessibility').textContent =
      data.ux.accessibility;
    this.updateRecommendations('ux', data.ux.recommendations);

    // Update Security Card
    document.getElementById('secScore').textContent = data.security.score;
    document.getElementById('https').textContent = data.security.https;
    this.updateRecommendations('sec', data.security.recommendations);

    // Update Accessibility Card
    document.getElementById('a11yScore').textContent = data.a11y.score;
    document.getElementById('wcag').textContent = data.a11y.wcag;
    this.updateRecommendations('a11y', data.a11y.recommendations);

    // Show results
    this.resultsSection.classList.add('visible');
  }

  updateScoreTitle(score) {
    const titleEl = document.getElementById('scoreTitle');
    const msgEl = document.getElementById('scoreMessage');

    if (score >= 90) {
      titleEl.textContent = 'Excellent';
      msgEl.textContent =
        'Your website is performing exceptionally well! Keep up the great work.';
    } else if (score >= 80) {
      titleEl.textContent = 'Very Good';
      msgEl.textContent =
        'Your website is performing well. Check the recommendations below to improve further.';
    } else if (score >= 70) {
      titleEl.textContent = 'Good';
      msgEl.textContent =
        'Your website has a solid foundation. Consider the recommendations to enhance performance.';
    } else if (score >= 50) {
      titleEl.textContent = 'Fair';
      msgEl.textContent =
        'There are several areas for improvement. Review the recommendations to boost your score.';
    } else {
      titleEl.textContent = 'Needs Work';
      msgEl.textContent =
        'Your website needs significant improvements. Start with the high-priority recommendations below.';
    }
  }

  updateProgressRing(score) {
    const circle = document.querySelector('.progress-ring-circle');
    const circumference = 2 * Math.PI * 60;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    circle.style.strokeDashoffset = strokeDashoffset;

    // Color based on score
    if (score >= 85) {
      circle.style.stroke = '#10b981';
    } else if (score >= 70) {
      circle.style.stroke = '#f59e0b';
    } else {
      circle.style.stroke = '#ef4444';
    }
  }

  updateRecommendations(prefix, recommendations) {
    recommendations.forEach((rec, index) => {
      const el = document.getElementById(`${prefix}${index + 1}`);
      if (el) {
        el.textContent = rec;
      }
    });
  }

  showLoading() {
    this.loadingState.classList.remove('hidden');
    this.loadingState.style.display = 'flex';
    this.hideResults();
  }

  hideLoading() {
    this.loadingState.classList.add('hidden');
    this.loadingState.style.display = 'none';
  }

  showError(message) {
    document.getElementById('errorText').textContent = message;
    this.errorMessage.classList.remove('hidden');
    this.errorMessage.classList.add('visible');
    this.errorMessage.style.display = 'block';
  }

  hideError() {
    this.errorMessage.classList.remove('visible');
    this.errorMessage.classList.add('hidden');
    this.errorMessage.style.display = 'none';
  }

  resetForm() {
    this.urlInput.value = '';
    this.urlInput.focus();
    this.resultsSection.classList.remove('visible');
    this.hideError();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new WebsiteAudit();
});
