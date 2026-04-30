// 应用数据存储
const AppData = {
    reports: [
        {
            id: '1',
            companyName: '广州XX机械设备有限公司',
            createTime: '2026-04-26 10:30',
            status: '已完成',
            data: {
                basicInfo: {
                    companyName: '广州XX机械设备有限公司',
                    establishTime: '2018-06-15',
                    registeredCapital: '5000万',
                    legalPerson: '张三',
                    industry: '制造业',
                    customerLevel: 'A类'
                },
                businessOpportunities: [
                    {
                        title: '企业货币资金充足，可推荐结构性存款',
                        data: '货币资金余额为1200万元，较上年同期增加20%',
                        product: '结构性存款'
                    },
                    {
                        title: '应收账款增加，可推荐保理业务',
                        data: '应收账款余额为850万元，较上年同期增加35%',
                        product: '保理业务'
                    },
                    {
                        title: '固定资产投资需求，可推荐设备贷款',
                        data: '固定资产原值为3200万元，计划年内新增设备投资500万元',
                        product: '设备贷款'
                    }
                ],
                riskWarnings: [
                    {
                        level: '高',
                        content: '资产负债率同比上升15%，需关注偿债能力',
                        data: '资产负债率从45%上升至52%'
                    },
                    {
                        level: '中',
                        content: '净利润同比下降8%，需核实原因',
                        data: '净利润从280万元下降至258万元'
                    }
                ],
                financialData: {
                    revenue: '12000万',
                    revenueChange: '+12%',
                    profit: '258万',
                    profitChange: '-8%',
                    assetLiabilityRatio: '52%',
                    assetLiabilityRatioChange: '+15%',
                    currentRatio: '1.8',
                    currentRatioChange: '-0.2'
                },
                cooperationHistory: {
                    startDate: '2020-03-10',
                    creditLimit: '2000万',
                    settlementAmount: '8500万',
                    usedProducts: ['流动资金贷款', '银行承兑汇票', '国内信用证']
                },
                communicationSuggestions: {
                    opening: '您好，张总，感谢您一直以来对我们银行的支持。根据我们的分析，贵公司近期经营状况良好，特别是在市场份额方面有显著提升。',
                    business: '基于贵公司的财务状况，我们为您推荐结构性存款产品，年化收益率可达3.5%，比活期存款高出不少。另外，针对您的应收账款增加情况，我们的保理业务可以帮助您提前回笼资金，优化现金流。',
                    objection: '如果您对产品有任何疑问，我们可以提供详细的方案和案例，帮助您更好地理解产品优势。我们也可以根据您的具体需求，为您量身定制金融解决方案。'
                }
            }
        },
        {
            id: '2',
            companyName: '深圳XX科技有限公司',
            createTime: '2026-04-25 15:45',
            status: '已发送'
        },
        {
            id: '3',
            companyName: '上海XX贸易有限公司',
            createTime: '2026-04-24 09:15',
            status: '草稿'
        },
        {
            id: '4',
            companyName: '北京XX金融服务有限公司',
            createTime: '2026-04-23 14:20',
            status: '已完成'
        }
    ],
    messages: [],
    currentReport: null,
    uploadedFiles: []
};

// 企业数据列表 - 用于模糊搜索
const enterpriseList = [
    { name: '广州越秀集团股份有限公司', creditCode: '91440101MA5AXY1234', industry: '房地产' },
    { name: '广州白云山医药集团股份有限公司', creditCode: '91440101MA5AXY5678', industry: '医药制造' },
    { name: '广州发展集团股份有限公司', creditCode: '91440101MA5AXY9012', industry: '能源' },
    { name: '广州汽车集团股份有限公司', creditCode: '91440101MA5AXY3456', industry: '汽车制造' },
    { name: '中国南方电网有限责任公司', creditCode: '91440000MA5AXY7890', industry: '电力' },
    { name: '广州地铁集团有限公司', creditCode: '91440101MA5AXY2345', industry: '交通运输' },
    { name: '广州市城市建设投资集团有限公司', creditCode: '91440101MA5AXY6789', industry: '城市建设' },
    { name: '广州港集团有限公司', creditCode: '91440101MA5AXY0123', industry: '港口物流' },
    { name: '广州工业投资控股集团有限公司', creditCode: '91440101MA5AXY4567', industry: '工业制造' },
    { name: '广州交通投资集团有限公司', creditCode: '91440101MA5AXY8901', industry: '交通运输' },
    { name: '越秀地产股份有限公司', creditCode: '91440101MA5AXY2345', industry: '房地产' },
    { name: '越秀金控集团股份有限公司', creditCode: '91440101MA5AXY6789', industry: '金融' },
    { name: '越秀金融控股集团', creditCode: '91440101MA5AXY0123', industry: '金融' },
    { name: '越秀投资有限公司', creditCode: '91440101MA5AXY4567', industry: '投资' },
    { name: '深圳腾讯科技有限公司', creditCode: '91310000MA1FXY9012', industry: '互联网' },
    { name: '深圳华为技术有限公司', creditCode: '91440300MA5DXY5678', industry: '通信设备' },
    { name: '上海阿里巴巴有限公司', creditCode: '91310000MA1FXY9012', industry: '互联网' },
    { name: '北京字节跳动科技有限公司', creditCode: '91110108MA5AXY3456', industry: '互联网' },
    { name: '杭州海康威视数字技术股份有限公司', creditCode: '91330000MA5AXY7890', industry: '电子科技' },
    { name: '南京小米科技有限公司', creditCode: '91320100MA5AXY2345', industry: '智能硬件' }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    loadRecentReports();
    loadAllReports();
    initCompanySearch();
});

// 回到上一页
function goBack() {
    window.location.href = 'index.html';
}

// ==================== 企业名称模糊搜索 ====================
function initCompanySearch() {
    const companyNameInput = document.getElementById('companyName');
    const searchResults = document.getElementById('companySearchResults');
    
    if (!companyNameInput || !searchResults) return;
    
    companyNameInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length === 0) {
            searchResults.style.display = 'none';
            searchResults.innerHTML = '';
            return;
        }
        
        // 模糊搜索匹配
        const filteredCompanies = enterpriseList.filter(company => 
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredCompanies.length === 0) {
            searchResults.innerHTML = '<div class="search-item no-result">未找到匹配的企业</div>';
            searchResults.style.display = 'block';
        } else {
            let html = '';
            filteredCompanies.forEach(company => {
                // 高亮匹配的文字
                const highlightedName = company.name.replace(
                    new RegExp(`(${searchTerm})`, 'gi'),
                    '<span class="highlight">$1</span>'
                );
                html += `
                    <div class="search-item" onclick="selectCompany('${company.name}', '${company.creditCode}', '${company.industry}')">
                        <div class="company-name">${highlightedName}</div>
                        <div class="company-code">${company.creditCode}</div>
                        <div class="company-industry">${company.industry}</div>
                    </div>
                `;
            });
            searchResults.innerHTML = html;
            searchResults.style.display = 'block';
        }
    });
    
    // 点击其他地方关闭搜索结果
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.form-item')) {
            searchResults.style.display = 'none';
        }
    });
}

function selectCompany(name, creditCode, industry) {
    const companyNameInput = document.getElementById('companyName');
    const creditCodeInput = document.getElementById('creditCode');
    const industryInput = document.getElementById('industry');
    const searchResults = document.getElementById('companySearchResults');
    
    if (companyNameInput) {
        companyNameInput.value = name;
    }
    if (creditCodeInput) {
        creditCodeInput.value = creditCode;
    }
    if (industryInput) {
        industryInput.value = industry;
    }
    
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// ==================== 页面导航 ====================
function navigateTo(page) {
    // 获取当前活动页面
    const activePage = document.querySelector('.page.active');
    const fromPage = activePage ? activePage.id : '';
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 如果跳转到报告详情，加载报告数据
    if (page === 'report-detail' && AppData.currentReport) {
        loadReportDetail(AppData.currentReport);
    }
    
    // 如果跳转到报告列表，刷新列表并重置筛选条件
    if (page === 'report-list') {
        // 重置筛选条件
        const companySearch = document.getElementById('companySearch');
        const timeFilter = document.getElementById('timeFilter');
        const searchSuggestions = document.getElementById('searchSuggestions');
        
        if (companySearch) companySearch.value = '';
        if (timeFilter) timeFilter.value = '';
        if (searchSuggestions) searchSuggestions.style.display = 'none';
        
        loadAllReports();
    }
    
    // 如果从首页跳转到企业信息页，清空输入字段
    if (page === 'company-info' && fromPage === 'page-home') {
        // 从首页跳转，清空字段
        clearCompanyInfoFields();
    }
    // 从其他页面跳转（如报告详情页），保留字段
}

// 清空企业信息字段
function clearCompanyInfoFields() {
    const companyNameInput = document.getElementById('companyName');
    const creditCodeInput = document.getElementById('creditCode');
    const industryInput = document.getElementById('industry');
    
    if (companyNameInput) companyNameInput.value = '';
    if (creditCodeInput) creditCodeInput.value = '';
    if (industryInput) industryInput.value = '';
    
    // 清空上传文件列表
    AppData.uploadedFiles = [];
    renderUploadedFiles();
}

// ==================== 首页功能 ====================
function loadRecentReports() {
    const container = document.getElementById('recentReportList');
    if (!container) return;
    
    const recentReports = AppData.reports.slice(0, 4);
    
    if (recentReports.length === 0) {
        container.innerHTML = '<div class="empty-report"><text>暂无报告</text></div>';
        return;
    }
    
    let html = '';
    recentReports.forEach(report => {
        html += `
            <div class="report-card" onclick="viewReport('${report.id}')">
                <div class="report-info">
                    <text class="report-company">${report.companyName}</text>
                    <text class="report-time">${report.createTime}</text>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadAllReports() {
    const container = document.getElementById('allReportList');
    if (!container) return;
    
    const timeFilter = document.getElementById('timeFilter');
    const companySearch = document.getElementById('companySearch');
    
    let filteredReports = AppData.reports;
    
    // 客户名称搜索
    if (companySearch && companySearch.value.trim()) {
        const searchTerm = companySearch.value.trim().toLowerCase();
        filteredReports = filteredReports.filter(report => 
            report.companyName.toLowerCase().includes(searchTerm)
        );
    }
    
    // 时间筛选
    if (timeFilter && timeFilter.value) {
        const now = new Date();
        filteredReports = filteredReports.filter(report => {
            const reportDate = new Date(report.createTime);
            if (timeFilter.value === 'today') {
                return reportDate.toDateString() === now.toDateString();
            } else if (timeFilter.value === 'week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return reportDate >= weekAgo;
            } else if (timeFilter.value === 'month') {
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return reportDate >= monthAgo;
            }
            return true;
        });
    }
    
    if (filteredReports.length === 0) {
        container.innerHTML = '<div class="empty-report"><text>暂无报告</text></div>';
        return;
    }
    
    let html = '';
    filteredReports.forEach(report => {
        html += `
            <div class="report-card" onclick="viewReport('${report.id}')">
                <div class="report-info">
                    <text class="report-company">${report.companyName}</text>
                    <text class="report-time">${report.createTime}</text>
                </div>
                <div class="report-actions" onclick="event.stopPropagation()">
                    <button class="action-btn" onclick="sendEmailById('${report.id}')">发送邮件</button>
                    <button class="action-btn delete-btn" onclick="deleteReportById('${report.id}')">删除</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function viewReport(id) {
    AppData.currentReport = id;
    navigateTo('report-detail');
}

function filterReports() {
    showSearchSuggestions();
    loadAllReports();
}

function showSearchSuggestions() {
    const searchInput = document.getElementById('companySearch');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (!searchInput || !suggestionsContainer) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // 获取所有唯一的公司名称
    const companyNames = [...new Set(AppData.reports.map(report => report.companyName))];
    
    // 过滤匹配的公司名称
    const filteredNames = searchTerm ? 
        companyNames.filter(name => name.toLowerCase().includes(searchTerm)) : 
        companyNames;
    
    if (filteredNames.length > 0) {
        suggestionsContainer.innerHTML = '';
        filteredNames.forEach(name => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'search-suggestion-item';
            suggestionItem.textContent = name;
            suggestionItem.onclick = () => {
                searchInput.value = name;
                suggestionsContainer.style.display = 'none';
                filterReports();
            };
            suggestionsContainer.appendChild(suggestionItem);
        });
        suggestionsContainer.style.display = 'block';
    } else {
        suggestionsContainer.style.display = 'none';
    }
}

// 点击页面其他地方关闭搜索建议
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (searchContainer && suggestionsContainer && !searchContainer.contains(event.target)) {
        suggestionsContainer.style.display = 'none';
    }
});

function onVoiceInput() {
    showToast('语音输入功能暂未实现');
}

function showHelp() {
    showToast('使用帮助功能暂未实现');
}

// ==================== 企业信息与财报导入页 ====================
function autoFillInfo() {
    const companyNameInput = document.getElementById('companyName');
    const creditCodeInput = document.getElementById('creditCode');
    const industryInput = document.getElementById('industry');
    
    if (companyNameInput) companyNameInput.value = '广州XX机械设备有限公司';
    if (creditCodeInput) creditCodeInput.value = '91440101MA5AXYXXXXX';
    if (industryInput) industryInput.value = '制造业';
    showToast('信息已自动填充');
}

function takePhoto() {
    // 显示拍照选择模态框
    const photoModal = document.getElementById('photoModal');
    if (photoModal) {
        photoModal.style.display = 'flex';
    }
}

function hidePhotoModal() {
    const photoModal = document.getElementById('photoModal');
    if (photoModal) {
        photoModal.style.display = 'none';
    }
}

function takeLivePhoto() {
    const fileName = '纸质财报照片_' + Date.now() + '.jpg';
    addUploadedFile(fileName);
    showToast('实时拍照上传成功');
    hidePhotoModal();
}

function selectFromGallery() {
    const fileName = '纸质财报照片_' + Date.now() + '.jpg';
    addUploadedFile(fileName);
    showToast('从相册选择上传成功');
    hidePhotoModal();
}

function chooseFile() {
    const fileName = '财务报告_2025年.pdf';
    addUploadedFile(fileName);
    showToast('文件上传成功');
}

function addUploadedFile(fileName) {
    AppData.uploadedFiles.push(fileName);
    renderUploadedFiles();
}

function renderUploadedFiles() {
    const container = document.getElementById('uploadedFiles');
    if (!container) return;
    
    if (AppData.uploadedFiles.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    let html = '<text class="upload-title">已上传文件</text>';
    AppData.uploadedFiles.forEach((file, index) => {
        html += `
            <div class="file-item">
                <text class="file-name">${file}</text>
                <button class="delete-btn" onclick="deleteFile(${index})">删除</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

function deleteFile(index) {
    AppData.uploadedFiles.splice(index, 1);
    renderUploadedFiles();
}

function parseFinancialReport() {
    const parsingSection = document.getElementById('parsingSection');
    const parseResult = document.getElementById('parseResult');
    const progress = document.getElementById('parseProgress');
    const progressText = document.getElementById('progressText');
    
    if (!parsingSection) return;
    
    parsingSection.style.display = 'block';
    if (parseResult) parseResult.style.display = 'none';
    
    let progressValue = 0;
    const interval = setInterval(() => {
        progressValue += 10;
        if (progress) progress.style.width = progressValue + '%';
        if (progressText) progressText.textContent = progressValue + '%';
        
        if (progressValue >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                parsingSection.style.display = 'none';
                if (parseResult) {
                    parseResult.style.display = 'block';
                    const parseResultMessage = document.getElementById('parseResultMessage');
                    if (parseResultMessage) parseResultMessage.textContent = '已成功解析3张报表，提取数据126项';
                }
            }, 500);
        }
    }, 300);
}

function generateReport() {
    const companyName = document.getElementById('companyName').value.trim();
    const creditCode = document.getElementById('creditCode') ? document.getElementById('creditCode').value.trim() : '';
    const industry = document.getElementById('industry') ? document.getElementById('industry').value.trim() : '';
    
    if (!companyName) {
        showToast('请输入企业名称');
        return;
    }
    
    parseFinancialReport();
    
    setTimeout(() => {
        const newReport = {
            id: Date.now().toString(),
            companyName: companyName,
            createTime: new Date().toLocaleString('zh-CN'),
            status: '已完成',
            data: {
                basicInfo: {
                    companyName: companyName,
                    establishTime: '2018-06-15',
                    registeredCapital: '5000万',
                    legalPerson: '张三',
                    industry: industry || '制造业',
                    customerLevel: 'A类'
                },
                businessOpportunities: [
                    {
                        title: '企业货币资金充足，可推荐结构性存款',
                        data: '货币资金余额为1200万元，较上年同期增加20%',
                        product: '结构性存款'
                    },
                    {
                        title: '应收账款增加，可推荐保理业务',
                        data: '应收账款余额为850万元，较上年同期增加35%',
                        product: '保理业务'
                    },
                    {
                        title: '固定资产投资需求，可推荐设备贷款',
                        data: '固定资产原值为3200万元，计划年内新增设备投资500万元',
                        product: '设备贷款'
                    }
                ],
                riskWarnings: [
                    {
                        level: '高',
                        content: '资产负债率同比上升15%，需关注偿债能力',
                        data: '资产负债率从45%上升至52%'
                    },
                    {
                        level: '中',
                        content: '净利润同比下降8%，需核实原因',
                        data: '净利润从280万元下降至258万元'
                    }
                ],
                financialData: {
                    revenue: '12000万',
                    revenueChange: '+12%',
                    profit: '258万',
                    profitChange: '-8%',
                    assetLiabilityRatio: '52%',
                    assetLiabilityRatioChange: '+15%',
                    currentRatio: '1.8',
                    currentRatioChange: '-0.2'
                },
                cooperationHistory: {
                    startDate: '2020-03-10',
                    creditLimit: '2000万',
                    settlementAmount: '8500万',
                    usedProducts: ['流动资金贷款', '银行承兑汇票', '国内信用证']
                },
                communicationSuggestions: {
                    opening: '您好，张总，感谢您一直以来对我们银行的支持。根据我们的分析，贵公司近期经营状况良好，特别是在市场份额方面有显著提升。',
                    business: '基于贵公司的财务状况，我们为您推荐结构性存款产品，年化收益率可达3.5%，比活期存款高出不少。另外，针对您的应收账款增加情况，我们的保理业务可以帮助您提前回笼资金，优化现金流。',
                    objection: '如果您对产品有任何疑问，我们可以提供详细的方案和案例，帮助您更好地理解产品优势。我们也可以根据您的具体需求，为您量身定制金融解决方案。'
                }
            }
        };
        
        AppData.reports.unshift(newReport);
        AppData.currentReport = newReport.id;
        AppData.uploadedFiles = [];
        
        navigateTo('report-detail');
    }, 3500);
}

// ==================== AI对话助手 ====================
function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    
    const message = input.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) loadingMessage.style.display = 'flex';
    
    setTimeout(() => {
        getAIResponse(message);
    }, 1000);
}

function sendQuickQuestion(question) {
    addUserMessage(question);
    
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) loadingMessage.style.display = 'flex';
    
    setTimeout(() => {
        getAIResponse(question);
    }, 1000);
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addUserMessage(message) {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;
    
    const userMessage = document.createElement('div');
    userMessage.className = 'message-item user-message';
    userMessage.innerHTML = `<div class="message-content"><text>${message}</text></div>`;
    messageList.appendChild(userMessage);
    
    scrollToBottom();
}

function addAIMessage(message) {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;
    
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message-item ai-message';
    aiMessage.innerHTML = `<div class="message-content"><text>${message.replace(/\n/g, '<br>')}</text></div>`;
    messageList.appendChild(aiMessage);
    
    scrollToBottom();
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
    }
}

function getAIResponse(question) {
    const loadingMessage = document.getElementById('loadingMessage');
    if (loadingMessage) loadingMessage.style.display = 'none';
    
    let response = '';
    
    if (question.includes('偿债能力')) {
        response = '根据财务数据分析，该企业的资产负债率为52%，较上年同期上升15%，流动比率为1.8，较上年同期下降0.2。整体偿债能力有所下降，建议关注其短期债务偿还能力。';
    } else if (question.includes('营销商机')) {
        response = '基于企业财务数据，我们发现以下商机：\n\n1. 企业货币资金充足，可推荐结构性存款\n2. 应收账款增加，可推荐保理业务\n3. 固定资产投资需求，可推荐设备贷款';
    } else if (question.includes('风险点')) {
        response = '根据分析，该企业存在以下风险点：\n\n1. 资产负债率同比上升15%，需关注偿债能力\n2. 净利润同比下降8%，需核实原因';
    } else if (question.includes('沟通话术')) {
        response = '开场破冰：您好，张总，感谢您一直以来对我们银行的支持。根据我们的分析，贵公司近期经营状况良好，特别是在市场份额方面有显著提升。\n\n商机推荐：基于贵公司的财务状况，我们为您推荐结构性存款产品，年化收益率可达3.5%，比活期存款高出不少。另外，针对您的应收账款增加情况，我们的保理业务可以帮助您提前回笼资金，优化现金流。\n\n异议处理：如果您对产品有任何疑问，我们可以提供详细的方案和案例，帮助您更好地理解产品优势。我们也可以根据您的具体需求，为您量身定制金融解决方案。';
    } else if (question.includes('经营情况')) {
        response = '根据财报数据，该企业2025年营收为12000万元，同比增长12%，净利润为258万元，同比下降8%。整体经营状况良好，但净利润有所下降，建议关注成本控制和收入结构。';
    } else {
        response = '感谢您的提问。根据我们的分析，广州XX机械设备有限公司是一家成立于2018年的制造业企业，注册资本5000万元。公司经营状况良好，近期营收增长12%，但净利润有所下降。我们建议关注其偿债能力和成本控制。';
    }
    
    addAIMessage(response);
}

// ==================== 报告详情页 ====================
function loadReportDetail(reportId) {
    const report = AppData.reports.find(r => r.id === reportId);
    if (!report || !report.data) return;
    
    const data = report.data;
    
    const detailCompanyName = document.getElementById('detail-companyName');
    const detailEstablishTime = document.getElementById('detail-establishTime');
    const detailRegisteredCapital = document.getElementById('detail-registeredCapital');
    const detailLegalPerson = document.getElementById('detail-legalPerson');
    const detailIndustry = document.getElementById('detail-industry');
    const detailCustomerLevel = document.getElementById('detail-customerLevel');
    
    if (detailCompanyName) detailCompanyName.textContent = data.basicInfo.companyName;
    if (detailEstablishTime) detailEstablishTime.textContent = data.basicInfo.establishTime;
    if (detailRegisteredCapital) detailRegisteredCapital.textContent = data.basicInfo.registeredCapital;
    if (detailLegalPerson) detailLegalPerson.textContent = data.basicInfo.legalPerson;
    if (detailIndustry) detailIndustry.textContent = data.basicInfo.industry;
    if (detailCustomerLevel) detailCustomerLevel.textContent = data.basicInfo.customerLevel;
}

function toggleModule(moduleName) {
    const moduleContent = document.getElementById('module-' + moduleName);
    const icon = document.getElementById('icon-' + moduleName);
    
    if (moduleContent) {
        if (moduleContent.style.display === 'none') {
            moduleContent.style.display = 'block';
            if (icon) icon.textContent = '▲';
        } else {
            moduleContent.style.display = 'none';
            if (icon) icon.textContent = '▼';
        }
    }
}

function editReport() {
    showToast('编辑报告功能暂未实现');
}

function exportPDF() {
    showToast('PDF导出功能暂未实现');
}

function shareReport() {
    showToast('分享功能暂未实现');
}

function showEmailModal() {
    const companyName = document.getElementById('detail-companyName')?.textContent || '企业名称';
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;
    const subject = `${companyName}访前一页纸（${dateStr}）`;
    
    const emailSubject = document.getElementById('emailSubject');
    if (emailSubject) emailSubject.value = subject;
    
    const emailModal = document.getElementById('emailModal');
    if (emailModal) emailModal.style.display = 'flex';
}

function hideEmailModal() {
    const emailModal = document.getElementById('emailModal');
    if (emailModal) emailModal.style.display = 'none';
}

function editReportById(id) {
    showToast('编辑报告功能暂未实现');
}

function sendEmailById(id) {
    showToast('发送邮件功能暂未实现');
}

function deleteReportById(id) {
    AppData.reports = AppData.reports.filter(r => r.id !== id);
    loadAllReports();
    showToast('报告已删除');
}

// ==================== Toast提示 ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.style.display = 'flex';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }
}