/*
  # ERÜ Paylaşım Merkezi - İlk Veritabanı Şeması

  1. Yeni Tablolar
    - `profiles` - Kullanıcı profilleri ve ek bilgileri
    - `subjects` - Dersler ve konular
    - `notes` - Notlar ve dökümanlar
    - `comments` - Not yorumları
    - `ratings` - Not değerlendirmeleri
    - `favorites` - Favori notlar
    - `downloads` - İndirme geçmişi
    - `notifications` - Bildirimler
    - `class_groups` - Sınıf grupları
    - `group_members` - Grup üyelikleri
    - `forum_topics` - Forum konuları
    - `forum_posts` - Forum gönderileri
    - `user_points` - Kullanıcı puanları

  2. Güvenlik
    - RLS tüm tablolarda aktif
    - Kullanıcı bazlı erişim politikaları
    - Dosya yükleme güvenlik kuralları

  3. İndexler ve Performans Optimizasyonu
*/

-- Kullanıcı profilleri
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  student_number text,
  department text,
  year integer,
  points integer DEFAULT 0,
  level text DEFAULT 'Yeni Üye',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Dersler ve konular
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  department text NOT NULL,
  year integer NOT NULL,
  semester integer NOT NULL,
  description text,
  instructor text,
  created_at timestamptz DEFAULT now()
);

-- Notlar ve dökümanlar
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  content text,
  file_url text,
  file_name text,
  file_size integer,
  file_type text,
  subject_id uuid REFERENCES subjects(id),
  author_id uuid REFERENCES profiles(id) NOT NULL,
  is_public boolean DEFAULT true,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  average_rating decimal DEFAULT 0,
  rating_count integer DEFAULT 0,
  tags text[],
  difficulty_level text DEFAULT 'Orta',
  note_type text DEFAULT 'Genel',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Yorumlar
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id),
  is_edited boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Değerlendirmeler
CREATE TABLE IF NOT EXISTS ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(note_id, user_id)
);

-- Favori notlar
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, note_id)
);

-- İndirme geçmişi
CREATE TABLE IF NOT EXISTS downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  note_id uuid REFERENCES notes(id) ON DELETE CASCADE NOT NULL,
  downloaded_at timestamptz DEFAULT now()
);

-- Bildirimler
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Sınıf grupları
CREATE TABLE IF NOT EXISTS class_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  subject_id uuid REFERENCES subjects(id),
  creator_id uuid REFERENCES profiles(id) NOT NULL,
  is_public boolean DEFAULT true,
  member_count integer DEFAULT 1,
  max_members integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Grup üyelikleri
CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES class_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Forum konuları
CREATE TABLE IF NOT EXISTS forum_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  author_id uuid REFERENCES profiles(id) NOT NULL,
  is_pinned boolean DEFAULT false,
  is_locked boolean DEFAULT false,
  post_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  last_post_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum gönderileri
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid REFERENCES forum_topics(id) ON DELETE CASCADE NOT NULL,
  author_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES forum_posts(id),
  is_edited boolean DEFAULT false,
  edit_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Kullanıcı puanları
CREATE TABLE IF NOT EXISTS user_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  points integer NOT NULL,
  reason text NOT NULL,
  reference_type text,
  reference_id uuid,
  created_at timestamptz DEFAULT now()
);

-- RLS politikaları
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;

-- Profil politikaları
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Ders politikaları
CREATE POLICY "Anyone can view subjects" ON subjects FOR SELECT TO authenticated USING (true);

-- Not politikaları
CREATE POLICY "Anyone can view public notes" ON notes FOR SELECT TO authenticated USING (is_public = true OR author_id = auth.uid());
CREATE POLICY "Users can insert own notes" ON notes FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Users can update own notes" ON notes FOR UPDATE TO authenticated USING (author_id = auth.uid());
CREATE POLICY "Users can delete own notes" ON notes FOR DELETE TO authenticated USING (author_id = auth.uid());

-- Yorum politikaları
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert comments" ON comments FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE TO authenticated USING (author_id = auth.uid());
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE TO authenticated USING (author_id = auth.uid());

-- Değerlendirme politikaları
CREATE POLICY "Anyone can view ratings" ON ratings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can insert ratings" ON ratings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own ratings" ON ratings FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Favori politikaları
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL TO authenticated USING (user_id = auth.uid());

-- İndirme politikaları
CREATE POLICY "Users can view own downloads" ON downloads FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can add downloads" ON downloads FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Bildirim politikaları
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Grup politikaları
CREATE POLICY "Anyone can view public groups" ON class_groups FOR SELECT TO authenticated USING (is_public = true);
CREATE POLICY "Users can create groups" ON class_groups FOR INSERT TO authenticated WITH CHECK (creator_id = auth.uid());
CREATE POLICY "Creators can update own groups" ON class_groups FOR UPDATE TO authenticated USING (creator_id = auth.uid());

-- Forum politikaları
CREATE POLICY "Anyone can view forum topics" ON forum_topics FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create topics" ON forum_topics FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can update own topics" ON forum_topics FOR UPDATE TO authenticated USING (author_id = auth.uid());

CREATE POLICY "Anyone can view forum posts" ON forum_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create posts" ON forum_posts FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can update own posts" ON forum_posts FOR UPDATE TO authenticated USING (author_id = auth.uid());

-- Puan politikaları
CREATE POLICY "Users can view all points" ON user_points FOR SELECT TO authenticated USING (true);
CREATE POLICY "System can insert points" ON user_points FOR INSERT TO authenticated WITH CHECK (true);

-- İndeksler
CREATE INDEX idx_notes_author ON notes(author_id);
CREATE INDEX idx_notes_subject ON notes(subject_id);
CREATE INDEX idx_notes_created ON notes(created_at DESC);
CREATE INDEX idx_notes_rating ON notes(average_rating DESC);
CREATE INDEX idx_notes_downloads ON notes(download_count DESC);
CREATE INDEX idx_comments_note ON comments(note_id);
CREATE INDEX idx_ratings_note ON ratings(note_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_forum_posts_topic ON forum_posts(topic_id);
CREATE INDEX idx_user_points_user ON user_points(user_id);

-- Sample data
INSERT INTO subjects (name, code, department, year, semester, description) VALUES
('Veri Yapıları ve Algoritmalar', 'BIL 2001', 'Bilgisayar Mühendisliği', 2, 1, 'Temel veri yapıları ve algoritmalar'),
('Matematik I', 'MAT 1001', 'Genel', 1, 1, 'Diferansiyel ve integral hesap'),
('Fizik I', 'FIZ 1001', 'Genel', 1, 1, 'Klasik mekanik ve termodinamik'),
('İngilizce I', 'ING 1001', 'Genel', 1, 1, 'Temel İngilizce dil becerileri'),
('Programlama Temelleri', 'BIL 1001', 'Bilgisayar Mühendisliği', 1, 1, 'C ve Java programlama'),
('Veritabanı Yönetim Sistemleri', 'BIL 3001', 'Bilgisayar Mühendisliği', 3, 1, 'SQL ve veritabanı tasarımı');