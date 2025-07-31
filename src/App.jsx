import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Info, BookOpen, Image, Mail, HeartHandshake, Menu, X, Bell, Loader2, ExternalLink, Camera, MessageSquare } from 'lucide-react'; // Camera, MessageSquare 아이콘 추가
import axios from 'axios';

// 메인 App 컴포넌트
// 이 앱은 Tailwind CSS를 사용하여 모바일 우선(mobile-first) 반응형 디자인으로 구축되었습니다.
// `md:`와 같은 유틸리티 클래스를 통해 다양한 화면 크기에 맞춰 레이아웃이 자동으로 조정됩니다.
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'announcements': // 새로운 공지사항 페이지 추가
        return <AnnouncementsPage />;
      case 'contact':
        return <ContactPage />;
      case 'support':
        return <SupportPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-black flex flex-col">
      {/* Google Fonts - Noto Sans KR 임포트 및 적용 */}
      {/* 복지관 웹사이트에서 주로 사용하는 가독성 좋은 글자체인 'Noto Sans KR'을 적용합니다. */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
          body {
            font-family: 'Noto Sans KR', sans-serif;
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* 헤더 및 네비게이션 */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* 로고와 센터 이름을 클릭하면 홈으로 이동합니다. */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('home')}
          >
            <img src="/images/logo.png" alt="솔잎지역아동센터 로고" className="rounded-full" />
            {/* '솔잎'은 초록색, '지역아동센터'는 검은색으로 변경 */}
            <h1 className="text-2xl font-bold">
              <span className="text-green-600">솔잎</span>
              <span className="text-black">지역아동센터</span>
            </h1>
          </div>

          {/* 통합 네비게이션 */}
          <nav>
            <ul className="flex items-center space-x-1 list-none">
              {/* 
                아이콘 크기 조절 코드 추가: 
                size 속성을 사용하여 아이콘의 크기를 조절할 수 있습니다. 
                아래 코드에서는 size={42}로 설정되어 있으며, 필요에 따라 값을 변경할 수 있습니다.
              */}
              <li><NavItem icon={<Info size={42} />} text="센터 소개" onClick={() => navigate('about')} isActive={currentPage === 'about'} /></li>
              <li><NavItem icon={<BookOpen size={42} />} text="주요 사업" onClick={() => navigate('programs')} isActive={currentPage === 'programs'} /></li>
              <li><NavItem icon={<Image size={42} />} text="갤러리" onClick={() => navigate('gallery')} isActive={currentPage === 'gallery'} /></li>
              <li><NavItem icon={<Bell size={42} />} text="공지사항" onClick={() => navigate('announcements')} isActive={currentPage === 'announcements'} /></li>
              <li><NavItem icon={<Mail size={42} />} text="오시는 길" onClick={() => navigate('contact')} isActive={currentPage === 'contact'} /></li>
              <li><NavItem icon={<HeartHandshake size={42} />} text="후원/자원봉사" onClick={() => navigate('support')} isActive={currentPage === 'support'} /></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역: `container mx-auto p-4 md:p-8`를 사용하여 패딩과 최대 너비를 조절하여 반응형으로 만듭니다. */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderPage()}
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white p-6 text-center text-sm">
        <div className="container mx-auto">
          {/* 대표 이름 및 주소 업데이트 */}
          <p>솔잎지역아동센터 | 대표: 정경택 | 주소: 대구광역시 동구 송라로 36, 2층 | 전화: 053-256-3217</p>
          <p>이메일: jcecbw@hanmail.net | 사업자등록번호: 502-80-12722</p>
          <p className="mt-2">&copy; 2025 솔잎지역아동센터. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// 네비게이션 아이템 컴포넌트
const NavItem = ({ icon, text, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`flex flex-row items-center space-x-2 p-2 rounded-md transition-colors duration-200
        ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}
      `}
    >
      {icon}
      {/* 
        네비게이션 아이템 글자 크기 조절:
        text-3xl 클래스를 사용하여 글자 크기를 키웠습니다. 
        필요에 따라 text-2xl, text-4xl 등으로 조절할 수 있습니다.
      */}
      <span className={`font-large ${isActive ? 'font-bold' : ''} text-3xl`}>{text}</span>
    </button>
  );

// 각 페이지 컴포넌트 정의

// 홈 페이지
const HomePage = () => (
  <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg text-center animate-fade-in">
    <h2 className="text-4xl font-extrabold text-black mb-4">
      솔잎지역아동센터에 오신 것을 환영합니다!
    </h2>
    <p className="text-lg text-black leading-relaxed max-w-3xl mx-auto mb-8">
      솔잎지역아동센터는 아동의 건강한 성장과 발달을 지원하고, 지역사회와 함께 아이들의 밝은 미래를 만들어가는 공간입니다.
      사랑과 관심으로 아이들의 꿈을 키워나갑니다.
    </p>
    <img
      src="/images/home_image.png" // 홈화면 이미지 넣기
      alt="아이들이 함께 웃는 모습"
      className="w-full rounded-lg shadow-md mb-8 object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
    />
    <div className="grid grid-cols-3 gap-6 mt-8">
      <FeatureCard
        icon={<HomeIcon size={40} className="text-blue-500" />}
        title="안전한 보호"
        description="아이들이 안심하고 생활할 수 있는 안전하고 쾌적한 환경을 제공합니다."
      />
      <FeatureCard
        icon={<BookOpen size={40} className="text-blue-500" />}
        title="균형 잡힌 성장"
        description="교육, 문화, 정서 지원을 통해 아이들의 전인적 성장을 돕습니다."
      />
      <FeatureCard
        icon={<HeartHandshake size={40} className="text-blue-500" />}
        title="지역사회 연계"
        description="지역사회 자원과 연계하여 아이들에게 다양한 기회를 제공합니다."
      />
    </div>
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-black mb-4">센터의 비전</h3>
      <p className="text-black leading-relaxed">
        솔잎지역아동센터는 모든 아이들이 존중받고 사랑받으며, 자신의 잠재력을 최대한 발휘할 수 있는 행복한 세상을 꿈꿉니다.
        아이들이 건강한 사회 구성원으로 성장할 수 있도록 든든한 버팀목이 되겠습니다.
      </p>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// 센터 소개 페이지
const AboutPage = () => (
  <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
    <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2">센터 소개</h2>

    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">솔잎지역아동센터는?</h3>
      <p className="text-black leading-relaxed">
        솔잎지역아동센터는 방과 후 돌봄이 필요한 아동들을 위해 안전한 보호, 교육, 건전한 놀이 및 문화 활동, 그리고 정서적 지원을 제공하는 아동복지시설입니다.
        지역사회 내 아동들의 건강한 성장과 발달을 돕고, 가정의 양육 부담을 경감하며, 아동들이 행복한 환경에서 미래의 꿈을 키울 수 있도록 지원하고 있습니다.
        저희 센터는 아이들이 존중받고 사랑받는 공간이 될 수 있도록 최선을 다하고 있습니다.
      </p>
    </div>

    <img
      src="/images/about_image.png"
      alt="아이들이 함께 활동하는 센터 내부 모습"
      className="w-full rounded-lg shadow-md mb-8 object-cover"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
    />

    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">설립 목적</h3>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li>아동의 건전한 발달을 위한 안전한 보호 및 교육 환경 제공</li>
        <li>아동의 잠재력 개발 및 개별 특성을 고려한 맞춤형 프로그램 운영</li>
        <li>지역사회 자원 연계를 통한 아동 복지 증진 및 가족 기능 강화</li>
        <li>아동의 권리 존중 및 아동 중심의 복지 실현</li>
        <li>아동들이 미래 사회의 건강한 구성원으로 성장하도록 지원</li>
      </ul>
    </div>

    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">센터 연혁</h3>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li>2010년 04월: 솔잎지역아동센터 설립 인가</li>
        <li>2013년: 센터 이전</li>
        <li>2013년: 아름인 도서관 설립</li>
        <li>2013년: 사회복지공동 모금회 승합차 지원</li>
        <li>2016년: 신협어부바멘토링(~2025년 현재)</li>
        <li>2018년: 야간특목형 아동센터 선정(~2025년 현재)</li>
      </ul>
    </div>

    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">직원 소개</h3>
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
        <StaffCard
          name="정경택 센터장"
          role="센터장"
          description="아이들의 행복을 최우선으로 생각하며, 센터 운영 전반을 총괄합니다."
          imgSrc="/images/staff_male.png"
        />
        <StaffCard
          name="전혜지 사회복지사"
          role="사회복지사"
          description="아동 개별 상담 및 프로그램 기획, 지역사회 연계 업무를 담당합니다."
          imgSrc="/images/staff_female.png"
        />
        <StaffCard
          name="어선영 사회복지사"
          role="사회복지사"
          description="아이들의 일상생활 관리 및 학습 지도를 담당합니다."
          imgSrc="/images/staff_female.png"
        />
      </div>
    </div>
  </section>
);

const StaffCard = ({ name, role, description, imgSrc }) => (
  <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center text-center h-full">
    <img
      src={imgSrc}
      alt={name}
      className="w-1/3 aspect-square rounded-full object-cover mb-4 border-4 border-gray-200"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/CCCCCC/000000?text=사진+없음"; }}
    />
    <div>
      <h4 className="text-xl font-bold text-gray-900">{name}</h4>
      <p className="text-blue-600 text-sm mb-1">{role}</p>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// 주요 사업 페이지
const ProgramsPage = () => (
  <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
    <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2">주요 사업</h2>
    <p className="text-black mb-8 leading-relaxed">
      솔잎지역아동센터는 아동의 건강한 성장과 발달을 위해 5가지 핵심 영역을 중심으로 다양한 프로그램을 운영합니다.
      아이들이 행복하고 안전하게 성장할 수 있도록 체계적인 지원을 제공합니다.
    </p>

    <div className="mb-10 p-6 bg-blue-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center space-x-2">
        <HomeIcon size={28} className="text-blue-600" />
        <span>1. 보호</span>
      </h3>
      <p className="text-black mb-4">
        아이들이 방과 후 안전하게 생활하고, 기본적인 욕구를 충족할 수 있도록 보호합니다.
      </p>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li><strong>안전한 생활 공간 제공:</strong> 쾌적하고 안전한 센터 환경 조성 및 관리</li>
        <li><strong>급식 지원:</strong> 영양가 있는 저녁 식사 및 간식 제공 (식단표 운영)</li>
        <li><strong>위생 및 건강 관리:</strong> 개인위생 지도, 건강 상태 확인 및 응급처치</li>
        <li><strong>귀가 지도:</strong> 안전한 귀가를 위한 지도 및 보호자 연계</li>
      </ul>
      <img
        src="/images/program_care.png"
        alt="아이들이 센터에서 안전하게 쉬는 모습"
        className="w-full rounded-lg shadow-md mt-6 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </div>

    <div className="mb-10 p-6 bg-amber-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center space-x-2">
        <HeartHandshake size={28} className="text-amber-600" />
        <span>2. 정서지원</span>
      </h3>
      <p className="text-black mb-4">
        아이들의 건강한 정서 발달을 돕고, 심리적 안정감을 제공하여 행복하게 성장할 수 있도록 지원합니다.
      </p>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li><strong>개별 및 집단 상담:</strong> 아동의 고민 경청 및 정서적 지지, 또래 관계 증진</li>
        <li><strong>미술/음악/놀이 치료:</strong> 예술 활동을 통한 정서 표현 및 치유</li>
        <li><strong>자존감 향상 프로그램:</strong> 긍정적 자아 개념 형성 및 자신감 증진 활동</li>
        <li><strong>스트레스 관리:</strong> 놀이, 휴식 등을 통한 스트레스 해소</li>
      </ul>
      <img
        src="/images/program_counseling.png"
        alt="아이들이 상담 또는 치료 활동에 참여하는 모습"
        className="w-full rounded-lg shadow-md mt-6 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </div>

    <div className="mb-10 p-6 bg-purple-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center space-x-2">
        <Image size={28} className="text-purple-600" />
        <span>3. 문화체험</span>
      </h3>
      <p className="text-black mb-4">
        다양한 문화 활동을 통해 아이들의 견문을 넓히고, 풍부한 감수성을 함양하도록 돕습니다.
      </p>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li><strong>영화/연극/뮤지컬 관람:</strong> 다양한 공연 관람을 통한 문화적 경험</li>
        <li><strong>박물관/미술관/과학관 견학:</strong> 학습과 연계된 체험 활동</li>
        <li><strong>계절별 나들이 및 캠프:</strong> 자연 속에서 즐거운 추억 만들기 및 협동심 증진</li>
        <li><strong>요리 활동:</strong> 직접 음식을 만들며 오감 발달 및 성취감 경험</li>
      </ul>
      <img
        src="/images/program_culture.png"
        alt="아이들이 문화 체험 활동에 참여하는 모습"
        className="w-full rounded-lg shadow-md mt-6 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </div>

    <div className="mb-10 p-6 bg-stone-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-stone-800 mb-4 flex items-center space-x-2">
        <BookOpen size={28} className="text-stone-600" />
        <span>4. 교육</span>
      </h3>
      <p className="text-black mb-4">
        아이들의 학업 성취도 향상과 자기 주도 학습 능력 강화를 위한 맞춤형 교육을 제공합니다.
      </p>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li><strong>개별 맞춤형 학습 지도:</strong> 국어, 수학, 영어 등 주요 과목 학습 지원</li>
        <li><strong>숙제 지도 및 보충 학습:</strong> 학교 숙제 지원 및 부족한 부분 보충</li>
        <li><strong>독서 지도 및 논술 교육:</strong> 독서 습관 형성 및 사고력, 표현력 증진</li>
        <li><strong>특기적성 교육:</strong> 미술, 음악, 체육, 컴퓨터 등 예체능 및 정보화 교육</li>
      </ul>
      <img
        src="/images/program_education.png"
        alt="아이들이 학습 활동에 집중하는 모습"
        className="w-full rounded-lg shadow-md mt-6 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </div>

    <div className="mb-10 p-6 bg-red-50 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-red-800 mb-4 flex items-center space-x-2">
        <Info size={28} className="text-red-600" />
        <span>5. 지역연계</span>
      </h3>
      <p className="text-black mb-4">
        지역사회 자원을 적극적으로 활용하고 연계하여 아이들에게 더욱 풍부한 기회를 제공하고, 지역사회와 함께 성장합니다.
      </p>
      <ul className="list-disc list-inside text-black space-y-2 pl-4">
        <li><strong>자원봉사자 연계:</strong> 학습 지도, 특기 적성 교육 등 자원봉사자 활용</li>
        <li><strong>지역사회 기관 협력:</strong> 도서관, 복지관, 보건소 등과 연계 프로그램 운영</li>
        <li><strong>캠페인 및 홍보 활동:</strong> 아동 권리 증진 및 지역사회 인식 개선 노력</li>
        <li><strong>후원자 개발 및 관리:</strong> 아이들을 위한 지속적인 후원 유치 및 관리</li>
      </ul>
      <img
        src="/images/program_community.png"
        alt="센터와 지역사회 기관이 협력하는 모습"
        className="w-full rounded-lg shadow-md mt-6 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </div>
  </section>
);

// 갤러리 페이지
const GalleryPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2 text-center">
        센터 갤러리
      </h2>
      
      <div className="flex flex-wrap justify-center gap-8">
        <GalleryLinkBox
          href="https://ion.or.kr/solip/community/photo/list/1"
          icon={<Camera size={48} className="text-blue-500" />}
          title="전체 갤러리 보기"
          description="솔잎지역아동센터 아이들의 즐거운 활동 모습을 확인해보세요!"
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
        />
        
        <GalleryLinkBox
          href="https://pf.kakao.com/_xbxlyUxb/posts"
          icon={<MessageSquare size={48} className="text-yellow-500" />}
          title="카카오톡 채널 소식"
          description="카카오톡 채널에서 더 많은 최신 소식을 만나보세요."
          bgColor="bg-yellow-50"
          borderColor="border-yellow-200"
        />
      </div>
    </section>
  );
};

// 갤러리 링크 박스 컴포넌트
const GalleryLinkBox = ({ href, icon, title, description, bgColor, borderColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group block p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center border ${borderColor} ${bgColor}`}
  >
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="text-black leading-relaxed">
      {description}
    </p>
    <div className="mt-6">
      <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-semibold text-blue-600 border-2 border-blue-200 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        바로가기 <ExternalLink size={16} className="ml-2" />
      </span>
    </div>
  </a>
);


// 공지사항 페이지 컴포넌트 (링크 박스 형태로 변경)
const AnnouncementsPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2 text-center">
        센터 공지사항
      </h2>
      
      <div className="flex justify-center items-center mt-8">
        <GalleryLinkBox
          href="https://ion.or.kr/solip/community/notice/list/1"
          icon={<Bell size={48} className="text-green-500" />}
          title="솔잎지역아동센터의 주요 행사 및 소식"
          description="센터의 최신 공지사항을 확인하시려면 '바로가기'를 클릭해주세요."
          bgColor="bg-green-50"
          borderColor="border-green-200"
        />
      </div>
    </section>
  );
};


// 오시는 길 페이지
const ContactPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2">오시는 길</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">연락처 정보</h3>
          <ul className="text-black space-y-3">
            <li className="flex items-start space-x-2">
              <HomeIcon size={20} className="text-blue-600 mt-1 flex-shrink-0" />
              <span>주소: 대구광역시 동구 송라로 36, 2층<br/>(우) 41259 (지번) 신천동 178-1</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={20} className="text-blue-600" />
              <span>이메일: jcecbw@hanmail.net</span>
            </li>
            <li className="flex items-center space-x-2">
              <Info size={20} className="text-blue-600" />
              <span>전화: 053-256-3217</span>
            </li>
            <li className="flex items-center space-x-2">
              <BookOpen size={20} className="text-blue-600" />
              <span>팩스: 053-256-3218</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">운영 시간</h3>
          <ul className="text-black space-y-3">
            <li>월요일 - 금요일:</li>
            <ul className="list-disc list-inside ml-4">
              <li>학기 중: 10:00 ~ 21:00</li>
              <li>방학 중: 09:00 ~ 19:00</li>
            </ul>
            <li>토요일: 자체 행사시 운영</li>
            <li>일요일, 공휴일: 휴무</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">찾아오시는 길 (약도)</h3>
        <p className="text-black mb-4">
          대구광역시 동구 송라로 36, 2층에 위치하고 있습니다.
          대중교통 이용 시, 지하철 1호선 <span className="font-semibold text-blue-700">신천역 5번 출구</span>로 나와서 <span className="font-semibold text-blue-700">신천초등학교 앞</span>으로 오시면 됩니다.
        </p>
        <div
          className="w-full bg-gray-200 rounded-lg overflow-hidden shadow-md border-2 border-gray-200 transition-all duration-300"
          style={{ height: '600px' }} // 높이를 600px로 고정
        >
          <iframe
              src="https://map.kakao.com/?urlX=865779.0000000601&urlY=662241.9999999984&urlLevel=3&itemId=12009276&q=%EC%86%94%EC%9E%8E%EC%A7%80%EC%97%AD%EC%95%84%EB%8F%99%EC%84%BC%ED%84%B0&srcid=12009276&map_type=TYPE_MAP"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="솔잎지역아동센터 위치 약도"
          ></iframe>
        </div>
        <p className="mt-4 text-gray-600 text-sm text-center">
          * 지도를 움직여 주변을 확인하거나 확대/축소할 수 있습니다.
        </p>
      </div>
    </section>
  );
};

// 후원/자원봉사 페이지
const SupportPage = () => (
  <section className="bg-white p-8 rounded-lg shadow-lg animate-fade-in">
    <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-blue-200 pb-2">후원 및 자원봉사</h2>
    <p className="text-black mb-8 leading-relaxed">
      솔잎지역아동센터는 아이들의 밝은 미래를 위해 따뜻한 마음을 나누어주실 여러분의 후원과 자원봉사를 기다립니다.
      작은 관심이 아이들에게는 큰 희망이 됩니다.
    </p>

    <a href="https://www.1365.go.kr/vols/main.do" target="_blank" rel="noopener noreferrer">
      <img
        src="/images/support_image.png"
        alt="후원 및 자원봉사 활동 모습"
        className="w-full rounded-lg shadow-md mb-8 object-cover hover:opacity-80 transition-opacity"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/000000?text=이미지+없음"; }}
      />
    </a>

    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">후원 안내</h3>
        <p className="text-black leading-relaxed mb-4">
          정기 후원, 일시 후원 등 다양한 방법으로 아이들을 도울 수 있습니다.
          후원금은 아이들의 교육, 급식, 문화 체험 활동 등 전액 아이들을 위해 사용됩니다.
        </p>
        <ul className="list-disc list-inside text-black space-y-2 pl-4 mb-4">
          <li>정기 후원: 매월 일정 금액을 자동 이체하는 방식</li>
          <li>일시 후원: 원하는 시기에 자유롭게 후원하는 방식</li>
          <li>물품 후원: 도서, 학용품, 의류, 간식 등 아이들에게 필요한 물품 후원</li>
        </ul>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="font-bold text-blue-800 mb-2">후원 계좌 정보</p>
          <p className="text-gray-800 !font-bold">은행: IM뱅크(대구은행)</p>
          <p className="text-gray-800 !font-bold">계좌번호: 033-10-004910</p>
          <p className="text-gray-800 !font-bold">예금주: 솔잎지역아동센터</p>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          * 후원금은 연말정산 시 소득공제 혜택을 받으실 수 있습니다.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">자원봉사 안내</h3>
        <p className="text-black leading-relaxed mb-4">
          아이들과 함께 시간을 보내고 재능을 나누어주실 자원봉사자분들을 환영합니다.
        </p>
        <ul className="list-disc list-inside text-black space-y-2 pl-4 mb-4">
          <li>학습 지도 봉사: 국어, 수학, 영어 등 교과목 학습 지원</li>
          <li>특기적성 지도 봉사: 미술, 음악, 체육, 컴퓨터 등 재능 기부</li>
          <li>문화 체험 활동 보조: 나들이, 캠프 등 행사 보조</li>
          <li>환경 미화 봉사: 센터 청소 및 환경 정리</li>
          <li>급식 봉사: 아이들 식사 준비 및 배식 보조</li>
        </ul>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="font-bold text-amber-800 mb-2">자원봉사 신청 방법</p>
          <p className="text-gray-800">전화 또는 이메일로 문의 후 방문 상담</p>
          <p className="text-gray-800">담당자: 정경택 센터장 (053-256-3217)</p>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          * 자원봉사 시간은 VMS 또는 1365 자원봉사 포털에 등록 가능합니다.
        </p>
      </div>
    </div>

    <div className="mt-12 p-6 bg-blue-50 rounded-lg shadow-md text-center">
      <h3 className="text-2xl font-bold text-black mb-4">여러분의 따뜻한 손길을 기다립니다!</h3>
      <p className="text-black leading-relaxed">
        솔잎지역아동센터는 여러분의 소중한 후원과 봉사로 운영됩니다.
        아이들이 건강하고 행복하게 성장할 수 있도록 많은 관심과 사랑 부탁드립니다.
      </p>
    </div>
  </section>
);

// App 컴포넌트를 기본으로 내보냅니다.
export default App;