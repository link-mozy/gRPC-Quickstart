fn main () {
    let out_dir = std::path::PathBuf::from("src");
    tonic_build::configure()
    .out_dir(out_dir)
    .compile(&["proto/like_program.proto"], &[""])
    .unwrap();
}